import { Dice } from "./Dice";

interface ResultMap {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
}

describe("DICE => throw", () => {
  test("check random values on law of large numbers", () => {
    const output: number[] = [];
    const dice = new Dice();
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
      dice.throw();
      output.push(dice.value as number);
    }

    expect(output).toHaveLength(iterations);
    expect(new Set(output).size).toEqual(6);

    const map = output.reduce((acc, curr) => {
      const value = acc[curr as keyof ResultMap];
      acc[curr as keyof ResultMap] = value ? value + 1 : 1;
      return acc;
    }, {} as ResultMap);

    // TODO ? check law of large numbers

    console.log(map);
  });
});
