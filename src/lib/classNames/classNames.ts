export type Mods = Record<string, boolean | string | undefined>;

export function classNames(cls: string, mods: Mods = {}, extra: Array<string | undefined> = []): string {
  return [
    cls,
    ...extra.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(" ");
}
