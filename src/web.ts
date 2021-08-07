import { WebPlugin } from '@capacitor/core';

import type { CaptureOptions, CaptureResult, FingerprintPlugin, MatchOptions, MatchResult } from './definitions';

const UNIMPLEMENTED_TEXT = 'Not implemented on web.';

export class FingerprintWeb extends WebPlugin implements FingerprintPlugin {
  connect(): Promise<void> {
    throw this.unimplemented(UNIMPLEMENTED_TEXT);
  }
  disconnect(): Promise<void> {
    throw this.unimplemented(UNIMPLEMENTED_TEXT);
  }
  capture(options: CaptureOptions): Promise<CaptureResult> {
    console.log(options);
    throw this.unimplemented(UNIMPLEMENTED_TEXT);
  }
  match(options: MatchOptions & CaptureOptions): Promise<MatchResult> {
    console.log(options);
    throw this.unimplemented(UNIMPLEMENTED_TEXT);
  }
  init(options: { serial: string }): Promise<void> {
    console.log(options);
    throw this.unimplemented(UNIMPLEMENTED_TEXT);
  }
}
