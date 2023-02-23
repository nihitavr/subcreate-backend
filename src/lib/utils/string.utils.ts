export function isEmpty(str?: string) {
  return !str || str.length === 0;
}

export function splitAndTrimString(str: string, delimiter = ',') {
  return str
    .split(delimiter)
    .map((s) => s.trim())
    .filter((s) => s);
}
