import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { steppingNumbers as countSteppingNumbers } from ".";

const isStepping = (value: number): boolean => {
	const digits = String(value);
	for (let i = 1; i < digits.length; i++) {
		if (Math.abs(digits.charCodeAt(i) - digits.charCodeAt(i - 1)) !== 1)
			return false;
	}
	return true;
};

describe("1215. Stepping Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSteppingNumbers(0, 21)).toEqual([
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 21,
		]);
		expect(countSteppingNumbers(10, 15)).toEqual([10, 12]);
	});

	it("matches checking every number in random ranges", () => {
		const random = createRandom(1215);
		for (let run = 0; run < 100; run++) {
			const low = random.int(0, 5000);
			const high = random.int(low, low + 5000);
			const expected: number[] = [];
			for (let value = low; value <= high; value++) {
				if (isStepping(value)) expected.push(value);
			}
			expect(countSteppingNumbers(low, high)).toEqual(expected);
		}
	});

	it("lists only sorted stepping numbers up to 2 · 10^9", () => {
		const all = countSteppingNumbers(0, 2 * 10 ** 9);
		expect(all.every(isStepping)).toBeTrue();
		expect(
			all.every((value, i) => i === 0 || value > (all[i - 1] ?? 0)),
		).toBeTrue();
		// Greedily taking the largest next digit after a leading 1 gives 1234567898.
		expect(all.at(-1)).toBe(1234567898);
	});
});
