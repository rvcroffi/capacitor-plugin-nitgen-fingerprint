package com.rvcroffi.capacitor.plugin.nitgen.fingerprint;

import android.graphics.Bitmap;
import android.os.Build;

import androidx.annotation.RequiresApi;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.nitgen.SDK.AndroidBSP.NBioBSPJNI;

import java.io.ByteArrayOutputStream;
import java.util.Base64;

@CapacitorPlugin(name = "Fingerprint")
public class FingerprintPlugin extends Plugin {

    private NBioBSPJNI bsp;
    private int captureTimeout = 10000;
    private Bitmap.CompressFormat compressFormat = Bitmap.CompressFormat.PNG;
    private int imageQuality = 50;
    private int securityLevel = NBioBSPJNI.FIR_SECURITY_LEVEL.NORMAL;
    private Fingerprint implementation = new Fingerprint();
    private NBioBSPJNI.CAPTURE_CALLBACK mCallback = new NBioBSPJNI.CAPTURE_CALLBACK() {

        @Override
        public int OnCaptured(NBioBSPJNI.CAPTURED_DATA capturedData) {
            return 0;
        }

        @Override
        public void OnConnected() {
            NBioBSPJNI.isConnected = true;
            JSObject ret = new JSObject();
            ret.put("openedDeviceID", bsp.GetOpenedDeviceID());
            notifyListeners("onConnected", ret);
        }

        @Override
        public void OnDisConnected() {
            NBioBSPJNI.isConnected = false;
            notifyListeners("onDisConnected", null);
        }
    };

    // Plugin Methods:

    @PluginMethod(returnType = PluginMethod.RETURN_NONE)
    public void init(PluginCall call) {
        String serial = call.getString("serial");
        captureTimeout = call.getInt("timeout", captureTimeout);
        String format = call.getString("imageFormat", "PNG");
        compressFormat = Bitmap.CompressFormat.valueOf(format);
        imageQuality = call.getInt("imageQuality", imageQuality);
        securityLevel = call.getInt("security", securityLevel);
        if(bsp == null){
            bsp = new NBioBSPJNI(serial, getContext(), mCallback);
            if(bsp.IsErrorOccured()){
                rejectNBioBSPError(call);
                return;
            }
        }
        NBioBSPJNI.INIT_INFO_0 init_info_0 = bsp.new INIT_INFO_0();
        init_info_0.DefaultTimeout = captureTimeout;
        init_info_0.EnrollImageQuality = imageQuality;
        init_info_0.IdentifyImageQuality = imageQuality;
        init_info_0.VerifyImageQuality = imageQuality;
        init_info_0.SecurityLevel = securityLevel;
        bsp.SetInitInfo(init_info_0);
        if(bsp.IsErrorOccured()){
            rejectNBioBSPError(call);
            return;
        }
        call.resolve();
    }

    @PluginMethod(returnType = PluginMethod.RETURN_NONE)
    public void connect(PluginCall call) {
        if(bsp != null){
            if(!NBioBSPJNI.isConnected){
                bsp.OpenDevice();
                if(bsp.IsErrorOccured()){
                    rejectNBioBSPError(call);
                    return;
                }
            }
        }else{
            rejectUninitializedPlugin(call);
            return;
        }
        call.resolve();
    }

    @PluginMethod(returnType = PluginMethod.RETURN_NONE)
    public void disconnect(PluginCall call) {
        if(bsp != null){
            if(NBioBSPJNI.isConnected){
                bsp.releaseDevice();
                if(bsp.IsErrorOccured()){
                    rejectNBioBSPError(call);
                    return;
                }
            }
        }else{
            rejectUninitializedPlugin(call);
            return;
        }
        call.resolve();
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @PluginMethod
    public void capture(PluginCall call) {
        int timeout = call.getInt("timeout", captureTimeout);
        String format = call.getString("imageFormat", Bitmap.CompressFormat.PNG.name());
        Bitmap.CompressFormat cFormat = Bitmap.CompressFormat.valueOf(format);
        int quality = call.getInt("imageQuality", imageQuality);
        JSObject ret = new JSObject();
        NBioBSPJNI.FIR_TEXTENCODE textFir;
        textFir = bsp.new FIR_TEXTENCODE();
        PluginCapturedData data = _capture(timeout);
        bsp.GetTextFIRFromHandle(data.gethCapturedFIR(), textFir);
        if(bsp.IsErrorOccured()){
            rejectNBioBSPError(call);
            return;
        }
        String image = _getImage(data.getCapturedData(), cFormat, quality);
        ret.put("image", image);
        ret.put("textFIR", textFir.TextFIR);
        call.resolve(ret);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @PluginMethod
    public void match(PluginCall call){
        JSObject ret = new JSObject();
        String stringFIR = call.getString("textFIR");
        int timeout = call.getInt("timeout", captureTimeout);
        String format = call.getString("imageFormat", Bitmap.CompressFormat.PNG.name());
        Bitmap.CompressFormat cFormat = Bitmap.CompressFormat.valueOf(format);
        int quality = call.getInt("imageQuality", imageQuality);
        NBioBSPJNI.FIR_TEXTENCODE textFir = bsp.new FIR_TEXTENCODE();
        NBioBSPJNI.INPUT_FIR inputFIR = bsp.new INPUT_FIR();
        NBioBSPJNI.INPUT_FIR capturedInputFIR = bsp.new INPUT_FIR();
        NBioBSPJNI.FIR_PAYLOAD payload = bsp.new FIR_PAYLOAD();
        Boolean result = new Boolean(false);
        textFir.TextFIR = stringFIR;
        inputFIR.SetTextFIR(textFir);
        PluginCapturedData data = _capture(timeout);
        capturedInputFIR.SetFIRHandle(data.gethCapturedFIR());
        bsp.VerifyMatch(capturedInputFIR, inputFIR, result, payload);
        String image = _getImage(data.getCapturedData(), cFormat, quality);
        NBioBSPJNI.FIR_TEXTENCODE capturedTextFir = bsp.new FIR_TEXTENCODE();
        bsp.GetTextFIRFromHandle(data.gethCapturedFIR(), capturedTextFir);
        ret.put("textFIR", capturedTextFir.TextFIR);
        ret.put("image", image);
        ret.put("isMatch", result);
        call.resolve(ret);
    }

    //Private Methods:

    private PluginCapturedData _capture(int timeout) {
        NBioBSPJNI.FIR_HANDLE hCapturedFIR, hAuditFIR;
        NBioBSPJNI.CAPTURED_DATA capturedData;
        PluginCapturedData data;
        hCapturedFIR = bsp.new FIR_HANDLE();
        hAuditFIR = bsp.new FIR_HANDLE();
        capturedData = bsp.new CAPTURED_DATA();
        bsp.Capture(NBioBSPJNI.FIR_PURPOSE.ENROLL, hCapturedFIR, timeout, hAuditFIR, capturedData);
        data = new PluginCapturedData(hCapturedFIR, hAuditFIR, capturedData);
        return data;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private String _getImage(NBioBSPJNI.CAPTURED_DATA capturedData, Bitmap.CompressFormat cFormat, int quality) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        capturedData.getImage().compress(cFormat, quality, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        String base64 = Base64.getEncoder().encodeToString(byteArray);
        return base64;
    }

    private void rejectUninitializedPlugin(PluginCall call){
        call.reject("Uninitialized plugin. Call init() first.");
    }

    private void rejectNBioBSPError(PluginCall call){
        call.reject("NBioBSP Error: " + bsp.GetErrorCode());
    }
}
