import { describe, expect, it } from "bun:test";
import { smallestNumberWithGivenDigitProduct as smallestNumber } from ".";

describe("2847. Smallest Number With Given Digit Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestNumber(105)).toBe("357");
		expect(smallestNumber(7)).toBe("7");
		expect(smallestNumber(44)).toBe("-1");
	});

	it("matches scanning integers for small products", () => {
		const firstWith = new Map<number, number>();
		for (let x = 1; x <= 100_000; x++) {
			const product = [...String(x)].reduce((p, d) => p * Number(d), 1);
			if (product > 0 && !firstWith.has(product)) firstWith.set(product, x);
		}
		for (let n = 1; n <= 200; n++) {
			const expected = firstWith.get(n);
			if (expected !== undefined)
				expect(smallestNumber(n)).toBe(String(expected));
		}
	});
});
