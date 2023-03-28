import { classNames } from "./classNames";

describe("classNames", () => {
  test("classNames called with one argument", () => {
    expect(classNames("class1")).toBe("class1");
  });

  test("classNames called with extra classes", () => {
    expect(classNames("class1", {}, ["class2", "class3"])).toBe("class1 class2 class3");
  });

  test("classNames called with extra classes & mods", () => {
    expect(classNames("class1", { variant: true }, ["class2", "class3"])).toBe("class1 class2 class3 variant");
  });

  test("classNames called with extra classes & mods variants", () => {
    expect(classNames("class1", { variant: true, unknown: false }, ["class2", "class3"])).toBe(
      "class1 class2 class3 variant"
    );
  });
  test("classNames called with extra classes & mods variants with undefined", () => {
    expect(classNames("class1", { variant: true, unknown: false, never: undefined }, ["class3", "class2"])).toBe(
      "class1 class3 class2 variant"
    );
  });
});
