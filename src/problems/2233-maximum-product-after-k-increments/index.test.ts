import { describe, expect, it } from "bun:test";
import { maximumProductAfterKIncrements as maximumProduct } from ".";

describe("2233. Maximum Product After K Increments", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumProduct([0, 4], 5)).toBe(20);
		expect(maximumProduct([6, 3, 3, 2], 2)).toBe(216);
	});

	it("reduces large products", () => {
		const nums = new Array<number>(10).fill(1_000_000);
		// (10^6)^10 mod 10^9 + 7, computed with BigInt.
		const expected = Number(10n ** 60n % 1_000_000_007n);
		expect(maximumProduct(nums, 0)).toBe(expected);
	});
});
