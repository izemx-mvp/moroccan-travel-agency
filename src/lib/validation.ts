/** Moroccan mobile: +212 6/7…, 00212 6/7…, 06… or 07… (spaces, dots and dashes ignored). */
export function isMoroccanPhone(value: string): boolean {
  const compact = value.replace(/[\s.\-()]/g, "");
  return /^(?:(?:\+|00)212[67]|0[67])\d{8}$/.test(compact);
}
