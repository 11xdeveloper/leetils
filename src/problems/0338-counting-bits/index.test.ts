import { describe, expect, it } from "bun:test";
import { countingBits } from ".";

describe("338. Counting Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(countingBits(2)).toEqual([0, 1, 1]);
		expect(countingBits(5)).toEqual([0, 1, 1, 2, 1, 2]);
		expect(countingBits(0)).toEqual([0]);
	});

	it("matches counting 1s in each binary string up to the constraint of 10^5", () => {
		const bits = countingBits(100_000);
		for (let i = 0; i <= 100_000; i++)
			expect(bits[i]).toBe(i.toString(2).replaceAll("0", "").length);
	});
});
