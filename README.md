# capacitor-plugin-nitgen-fingerprint

Capacitor plugin for Nitgen fingerprint devices.

## Install

```bash
npm install capacitor-plugin-nitgen-fingerprint
npx cap sync
```

## API

<docgen-index>

* [`init(...)`](#init)
* [`connect()`](#connect)
* [`disconnect()`](#disconnect)
* [`capture(...)`](#capture)
* [`match(...)`](#match)
* [`addListener('onConnected', ...)`](#addlisteneronconnected-)
* [`addListener('onDisconnected', ...)`](#addlistenerondisconnected-)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### init(...)

```typescript
init(options: InitOptions & CaptureOptions) => Promise<void>
```

Init the plugin with options

| Param         | Type                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#initoptions">InitOptions</a> & <a href="#captureoptions">CaptureOptions</a></code> |

**Since:** 1.0.0

--------------------


### connect()

```typescript
connect() => Promise<void>
```

Connect to fingerprint device

**Since:** 1.0.0

--------------------


### disconnect()

```typescript
disconnect() => Promise<void>
```

Disconnect from fingerprint device

**Since:** 1.0.0

--------------------


### capture(...)

```typescript
capture(options?: CaptureOptions | undefined) => Promise<CaptureResult>
```

Capture a fingerprint

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#captureoptions">CaptureOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#captureresult">CaptureResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### match(...)

```typescript
match(options: MatchOptions & CaptureOptions) => Promise<MatchResult>
```

Capture a fingerprint and match with a given text FIR

| Param         | Type                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#matchoptions">MatchOptions</a> & <a href="#captureoptions">CaptureOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#matchresult">MatchResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onConnected', ...)

```typescript
addListener(eventName: 'onConnected', listenerFunc: OnConnectedListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listen for connected event

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'onConnected'</code>                                          |
| **`listenerFunc`** | <code><a href="#onconnectedlistener">OnConnectedListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('onDisconnected', ...)

```typescript
addListener(eventName: 'onDisconnected', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listen for disconnected event

| Param              | Type                          |
| ------------------ | ----------------------------- |
| **`eventName`**    | <code>'onDisconnected'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>    |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### Interfaces


#### InitOptions

| Prop           | Type                                                    | Description    | Default             | Since |
| -------------- | ------------------------------------------------------- | -------------- | ------------------- | ----- |
| **`serial`**   | <code>string</code>                                     | Serial code    |                     | 1.0.0 |
| **`security`** | <code><a href="#securitylevel">SecurityLevel</a></code> | Security level | <code>NORMAL</code> | 1.0.0 |


#### CaptureOptions

| Prop               | Type                                                | Description                                             | Default            | Since |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------- | ------------------ | ----- |
| **`timeout`**      | <code>number</code>                                 | Capture timeout in milliseconds                         | <code>10000</code> | 1.0.0 |
| **`imageFormat`**  | <code><a href="#imageformat">ImageFormat</a></code> | Fingerprint image format                                | <code>PNG</code>   | 1.0.0 |
| **`imageQuality`** | <code>number</code>                                 | Fingerprint image quality (0-100) Only applied for JPEG | <code>50</code>    | 1.0.0 |


#### CaptureResult

| Prop          | Type                | Description                      | Since |
| ------------- | ------------------- | -------------------------------- | ----- |
| **`textFIR`** | <code>string</code> | Captured text FIR                | 1.0.0 |
| **`image`**   | <code>string</code> | base64 encoded fingerprint image | 1.0.0 |


#### MatchResult

| Prop          | Type                 | Description                              | Since |
| ------------- | -------------------- | ---------------------------------------- | ----- |
| **`isMatch`** | <code>boolean</code> | If captured fingerprint matched text FIR | 1.0.0 |
| **`textFIR`** | <code>string</code>  | Captured text FIR                        | 1.0.0 |
| **`image`**   | <code>string</code>  | base64 encoded fingerprint image         | 1.0.0 |


#### MatchOptions

| Prop          | Type                | Description                                          | Since |
| ------------- | ------------------- | ---------------------------------------------------- | ----- |
| **`textFIR`** | <code>string</code> | A stored text FIR to match with captured fingerprint | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### OnConnectedListenerEvent

| Prop                 | Type                | Description | Since |
| -------------------- | ------------------- | ----------- | ----- |
| **`openedDeviceID`** | <code>number</code> | Device ID   | 1.0.0 |


### Type Aliases


#### ImageFormat

<code>'PNG' | 'JPEG'</code>


#### OnConnectedListener

<code>(event: <a href="#onconnectedlistenerevent">OnConnectedListenerEvent</a>): void</code>


### Enums


#### SecurityLevel

| Members            | Value          |
| ------------------ | -------------- |
| **`LOWEST`**       | <code>1</code> |
| **`LOWER`**        | <code>2</code> |
| **`LOW`**          | <code>3</code> |
| **`BELOW_NORMAL`** | <code>4</code> |
| **`NORMAL`**       | <code>5</code> |
| **`ABOVE_NORMAL`** | <code>6</code> |
| **`HIGH`**         | <code>7</code> |
| **`HIGHER`**       | <code>8</code> |
| **`HIGHEST`**      | <code>9</code> |

</docgen-api>
