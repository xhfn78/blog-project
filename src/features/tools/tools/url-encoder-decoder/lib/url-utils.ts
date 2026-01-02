export function safeEncode(text: string): string {
  try {
    return encodeURIComponent(text);
  } catch (e) {
    return 'Error: Unable to encode text';
  }
}

export function safeDecode(text: string): string {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    return 'Error: Malformed URI sequence';
  }
}
