import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNumbersWithNonDecreasingDigits as countNumbers } from ".";

/** Checks every number's base-b digits. */
const byBruteForce = (l: number, r: number, b: number): number => {
	let count = 0;
	for (let x = l; x <= r; x++) {
		const digits = x.toString(b);
		if ([...digits].every((d, i) => i === 0 || d >= (digits[i - 1] ?? "")))
			count++;
	}
	return count;
};

describe("3519. Count Numbers with Non-Decreasing Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(countNumbers("23", "28", 8)).toBe(3);
		expect(countNumbers("2", "7", 2)).toBe(2);
	});

	it("matches checking every number on random ranges", () => {
		const random = createRandom(3519);
		for (let run = 0; run < 200; run++) {
			const l = random.int(1, 500);
			const r = random.int(l, 1000);
			const b = random.int(2, 10);
			expect(countNumbers(String(l), String(r), b)).toBe(byBruteForce(l, r, b));
		}
	});

	it("handles 100-digit bounds", () => {
		const result = countNumbers("1", "9".repeat(100), 10);
		expect(result).toBeGreaterThanOrEqual(0);
		expect(result).toBeLessThan(1_000_000_007);
	});
});
