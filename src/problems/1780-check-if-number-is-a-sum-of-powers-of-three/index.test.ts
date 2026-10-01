import { describe, expect, it } from "bun:test";
import { checkIfNumberIsASumOfPowersOfThree as checkPowersOfThree } from ".";

describe("1780. Check if Number is a Sum of Powers of Three", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkPowersOfThree(12)).toBeTrue();
		expect(checkPowersOfThree(91)).toBeTrue();
		expect(checkPowersOfThree(21)).toBeFalse();
	});

	it("matches listing every sum of distinct powers of three", () => {
		const sums = new Set<number>();
		for (let mask = 0; mask < 1 << 8; mask++) {
			let sum = 0;
			for (let i = 0; i < 8; i++) if (mask & (1 << i)) sum += 3 ** i;
			sums.add(sum);
		}
		for (let n = 1; n < 3 ** 8; n++)
			expect(checkPowersOfThree(n)).toBe(sums.has(n));
	});
});
