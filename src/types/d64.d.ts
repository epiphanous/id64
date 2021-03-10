declare module 'd64' {
  function encode(buf: Buffer): string;
  function decode(str: string): Buffer;
}
