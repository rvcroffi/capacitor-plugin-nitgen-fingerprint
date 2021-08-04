export interface FingerprintPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
