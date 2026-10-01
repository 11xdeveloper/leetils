import { describe, expect, it } from "bun:test";
import { howManyApplesCanYouPutIntoTheBasket as maxNumberOfApples } from ".";

describe("1196. How Many Apples Can You Put into the Basket", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxNumberOfApples([100, 200, 150, 1000])).toBe(4);
		expect(maxNumberOfApples([900, 950, 800, 1000, 700, 800])).toBe(5);
	});

	it("fills the basket exactly", () => {
		expect(maxNumberOfApples([1000, 1000, 1000, 1000, 1000, 1])).toBe(5);
		expect(maxNumberOfApples(new Array<number>(1000).fill(5))).toBe(1000);
		expect(maxNumberOfApples(new Array<number>(1000).fill(1000))).toBe(5);
	});
});
