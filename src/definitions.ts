import type { PluginListenerHandle } from '@capacitor/core';

export interface FingerprintPlugin {
  /**
   * Init the plugin with options
   * @since 1.0.0
   */
  init(options: InitOptions & CaptureOptions): Promise<void>;
  /**
   * Connect to fingerprint device
   * @since 1.0.0
   */
  connect(): Promise<void>;
  /**
   * Disconnect from fingerprint device
   * @since 1.0.0
   */
  disconnect(): Promise<void>;
  /**
   * Capture a fingerprint
   * @since 1.0.0
   */
  capture(options?: CaptureOptions): Promise<CaptureResult>;
  /**
   * Capture a fingerprint and match with a given text FIR
   * @since 1.0.0
   */
  match(options: MatchOptions & CaptureOptions): Promise<MatchResult>;

  /**
   * Listen for connected event
   * @since 1.0.0
   */
  addListener(
    eventName: 'onConnected',
    listenerFunc: OnConnectedListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  /**
   * Listen for disconnected event
   * @since 1.0.0
   */
  addListener(
    eventName: 'onDisconnected',
    listenerFunc: () => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

export interface OnConnectedListenerEvent {
  /**
   * Device ID
   * @since 1.0.0
   */
  openedDeviceID: number;
}

export type OnConnectedListener = (event: OnConnectedListenerEvent) => void;

export interface InitOptions {
  /**
   * Serial code
   * @since 1.0.0
   */
  serial: string;
  /**
   * Security level
   * @default NORMAL
   * @since 1.0.0
   */
  security?: SecurityLevel;
}

export interface CaptureOptions {
  /**
   * Capture timeout in milliseconds
   * @default 10000
   * @since 1.0.0
   */
  timeout?: number;
  /**
   * Fingerprint image format
   * @default PNG
   * @since 1.0.0
   */
  imageFormat?: ImageFormat;
  /**
   * Fingerprint image quality (0-100)
   * Only applied for JPEG
   * @default 50
   * @since 1.0.0
   */
  imageQuality?: number;
}

export interface CaptureResult {
  /**
   * Captured text FIR
   * @since 1.0.0
   */
  textFIR: string;
  /**
   * base64 encoded fingerprint image
   * @since 1.0.0
   */
  image: string;
}

export interface MatchOptions {
  /**
   * A stored text FIR to match with captured fingerprint
   * @since 1.0.0
   */
  textFIR: string;
}

export interface MatchResult {
  /**
   * If captured fingerprint matched text FIR
   * @since 1.0.0
   */
  isMatch: boolean;
  /**
   * Captured text FIR
   * @since 1.0.0
   */
  textFIR: string;
  /**
   * base64 encoded fingerprint image
   * @since 1.0.0
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
