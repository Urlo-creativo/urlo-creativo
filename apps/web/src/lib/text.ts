export function nonEmptyLines(value: string | null | undefined): string[] {
  if (!value) return [];

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function nonEmptyStringList(
  value: readonly string[] | string | null | undefined,
): string[] {
  if (!value) return [];
  if (typeof value === "string") return nonEmptyLines(value);

  return value.map((item) => item.trim()).filter(Boolean);
}
