package com.rvcroffi.capacitor.plugin.nitgen.fingerprint;

import com.nitgen.SDK.AndroidBSP.NBioBSPJNI;

public class PluginCapturedData {

    private NBioBSPJNI.FIR_HANDLE hCapturedFIR, hAuditFIR;
    private NBioBSPJNI.CAPTURED_DATA capturedData;

    public PluginCapturedData() {}

    public PluginCapturedData(NBioBSPJNI.FIR_HANDLE hCapturedFIR, NBioBSPJNI.FIR_HANDLE hAuditFIR, NBioBSPJNI.CAPTURED_DATA capturedData) {
        this.hCapturedFIR = hCapturedFIR;
        this.hAuditFIR = hAuditFIR;
        this.capturedData = capturedData;
    }

    public NBioBSPJNI.FIR_HANDLE gethCapturedFIR() {
        return hCapturedFIR;
    }

    public void sethCapturedFIR(NBioBSPJNI.FIR_HANDLE hCapturedFIR) {
        this.hCapturedFIR = hCapturedFIR;
    }

    public NBioBSPJNI.FIR_HANDLE gethAuditFIR() {
        return hAuditFIR;
    }

    public void sethAuditFIR(NBioBSPJNI.FIR_HANDLE hAuditFIR) {
        this.hAuditFIR = hAuditFIR;
    }

    public NBioBSPJNI.CAPTURED_DATA getCapturedData() {
        return capturedData;
    }

    public void setCapturedData(NBioBSPJNI.CAPTURED_DATA capturedData) {
        this.capturedData = capturedData;
    }
}
