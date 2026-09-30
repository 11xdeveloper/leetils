import { describe, expect, it } from "bun:test";
import { preimageSizeOfFactorialZeroesFunction as preimageSizeFZF } from ".";

describe("793. Preimage Size of Factorial Zeroes Function", () => {
	it("solves the examples from the problem statement", () => {
		expect(preimageSizeFZF(0)).toBe(5);
		expect(preimageSizeFZF(5)).toBe(0);
		expect(preimageSizeFZF(3)).toBe(5);
	});

	it("matches counting trailing zeros of every factorial up to 5,000!", () => {
		const counts = new Map<number, number>();
		for (let x = 0; x <= 5000; x++) {
			let zeros = 0;
			for (let power = 5; power <= x; power *= 5)
				zeros += Math.floor(x / power);
			counts.set(zeros, (counts.get(zeros) ?? 0) + 1);
		}
		for (let k = 0; k < 1240; k++)
			expect(preimageSizeFZF(k)).toBe(counts.get(k) ?? 0);
	});

	it("handles the largest input", () => {
		expect([0, 5]).toContain(preimageSizeFZF(10 ** 9));
	});
});
