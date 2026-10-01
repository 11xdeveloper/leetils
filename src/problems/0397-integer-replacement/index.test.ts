import { describe, expect, it } from "bun:test";
import { integerReplacement } from ".";

describe("397. Integer Replacement", () => {
	it("solves the examples from the problem statement", () => {
		expect(integerReplacement(8)).toBe(3);
		expect(integerReplacement(7)).toBe(4);
		expect(integerReplacement(4)).toBe(2);
	});

	it("handles the largest 32-bit integer, which overflows in fixed-width languages", () => {
		expect(integerReplacement(2 ** 31 - 1)).toBe(32);
	});

	it("matches dynamic programming for every n up to 10,000", () => {
		// steps[n] computed from smaller values: an odd n uses (n ± 1) / 2 plus two steps.
		const steps = [0, 0];
		for (let n = 2; n <= 10_000; n++) {
			steps.push(
				n % 2 === 0
					? (steps[n / 2] ?? 0) + 1
					: Math.min(steps[(n - 1) / 2] ?? 0, steps[(n + 1) / 2] ?? 0) + 2,
			);
			expect(integerReplacement(n)).toBe(steps[n] ?? 0);
		}
	});
});
