import type { PluginListenerHandle } from '@capacitor/core';

export interface FingerprintPlugin {
  /**
   * Init the plugin with options
   */
  init(options: InitOptions & CaptureOptions): Promise<void>;
  /**
   * Connect to fingerprint device
   */
  connect(): Promise<void>;
  /**
   * Disconnect from fingerprint device
   */
  disconnect(): Promise<void>;
  /**
   * Capture a fingerprint
   */
  capture(options: CaptureOptions): Promise<CaptureResult>;
  /**
   * Capture a fingerprint and match with a given text FIR
   */
  match(options: MatchOptions & CaptureOptions): Promise<MatchResult>;

  /**
   * Listen for connected event
   */
  addListener(
    eventName: 'onConnected',
    listenerFunc: () => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  /**
   * Listen for disconnected event
   */
  addListener(
    eventName: 'onDisconnected',
    listenerFunc: () => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

export interface InitOptions {
  /**
   * Serial code
   */
  serial: string;
  /**
   * Security level
   * @default NORMAL
   */
  security?: SecurityLevel;
}

export interface CaptureOptions {
  /**
   * Capture timeout in milliseconds
   * @default 10000
   */
  timeout?: number;
  /**
   * Fingerprint image format
   * @default PNG
   */
  imageFormat?: ImageFormat;
  /**
   * Fingerprint image quality (0-100)
   * Only applied for JPEG
   * @default 50
   */
  imageQuality?: number;
}

export interface CaptureResult {
  /**
   * Captured text FIR
   */
  textFIR: string;
  /**
   * base64 encoded fingerprint image
   */
  image: string;
}

export interface MatchOptions {
  /**
   * A stored text FIR to match with captured fingerprint
   */
  textFIR: string;
}

export interface MatchResult {
  /**
   * If captured fingerprint matched text FIR
   */
  isMatch: boolean;
  /**
   * Captured text FIR
   */
  textFIR: string;
  /**
   * base64 encoded fingerprint image
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
