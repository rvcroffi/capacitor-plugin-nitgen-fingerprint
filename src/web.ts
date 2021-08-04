import { WebPlugin } from '@capacitor/core';

import type { FingerprintPlugin } from './definitions';

export class FingerprintWeb extends WebPlugin implements FingerprintPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
