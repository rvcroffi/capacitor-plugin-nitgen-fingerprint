import type { PluginListenerHandle } from '@capacitor/core';

export interface FingerprintPlugin {
  /**
   * Init the plugin with options
   * @since 0.0.1
   */
  init(options: InitOptions & CaptureOptions): Promise<void>;
  /**
   * Connect to fingerprint device
   * @since 0.0.1
   */
  connect(): Promise<void>;
  /**
   * Disconnect from fingerprint device
   * @since 0.0.1
   */
  disconnect(): Promise<void>;
  /**
   * Capture a fingerprint
   * @since 0.0.1
   */
  capture(options?: CaptureOptions): Promise<CaptureResult>;
  /**
   * Capture a fingerprint and match with a given text FIR
   * @since 0.0.1
   */
  match(options: MatchOptions & CaptureOptions): Promise<MatchResult>;

  /**
   * Listen for connected event
   * @since 0.0.1
   */
  addListener(
    eventName: 'onConnected',
    listenerFunc: OnConnectedListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  /**
   * Listen for disconnected event
   * @since 0.0.1
   */
  addListener(
    eventName: 'onDisconnected',
    listenerFunc: () => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

export interface OnConnectedListenerEvent {
  /**
   * Device ID
   * @since 0.0.1
   */
  openedDeviceID: number;
}

export type OnConnectedListener = (event: OnConnectedListenerEvent) => void;

export interface InitOptions {
  /**
   * Serial code
   * @since 0.0.1
   */
  serial: string;
  /**
   * Security level
   * @default NORMAL
   * @since 0.0.1
   */
  security?: SecurityLevel;
}

export interface CaptureOptions {
  /**
   * Capture timeout in milliseconds
   * @default 10000
   * @since 0.0.1
   */
  timeout?: number;
  /**
   * Fingerprint image format
   * @default PNG
   * @since 0.0.1
   */
  imageFormat?: ImageFormat;
  /**
   * Fingerprint image quality (0-100)
   * Only applied for JPEG
   * @default 50
   * @since 0.0.1
   */
  imageQuality?: number;
}

export interface CaptureResult {
  /**
   * Captured text FIR
   * @since 0.0.1
   */
  textFIR: string;
  /**
   * base64 encoded fingerprint image
   * @since 0.0.1
   */
  image: string;
}

export interface MatchOptions {
  /**
   * A stored text FIR to match with captured fingerprint
   * @since 0.0.1
   */
  textFIR: string;
}

export interface MatchResult {
  /**
   * If captured fingerprint matched text FIR
   * @since 0.0.1
   */
  isMatch: boolean;
  /**
   * Captured text FIR
   * @since 0.0.1
   */
  textFIR: string;
  /**
   * base64 encoded fingerprint image
   * @since 0.0.1
   */
  image: string;
}

export enum SecurityLevel {
  LOWEST = 1,
  LOWER = 2,
  LOW = 3,
  BELOW_NORMAL = 4,
  NORMAL = 5,
  ABOVE_NORMAL = 6,
  HIGH = 7,
  HIGHER = 8,
  HIGHEST = 9,
}

export type ImageFormat = 'PNG' | 'JPEG';
