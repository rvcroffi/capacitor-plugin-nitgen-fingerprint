import { registerPlugin } from '@capacitor/core';

import type { FingerprintPlugin } from './definitions';

const Fingerprint = registerPlugin<FingerprintPlugin>('Fingerprint', {
  web: () => import('./web').then(m => new m.FingerprintWeb()),
});

export * from './definitions';
export { Fingerprint };
