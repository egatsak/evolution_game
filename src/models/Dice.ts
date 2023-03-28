import { DiceValue } from "./constants";

export class Dice {
  value: number | null = null;

  public throw() {
    this.value = this.getRandomDiceValue();
  }

  private getRandomDiceValue() {
    const random = 1 + Math.random() * 6;
    return Math.floor(random) as DiceValue;
  }
}
