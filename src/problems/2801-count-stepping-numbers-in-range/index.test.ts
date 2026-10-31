import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSteppingNumbersInRange as countSteppingNumbers } from ".";

/** Checks every number in the range. */
const byBruteForce = (low: number, high: number): number => {
	let count = 0;
	for (let x = low; x <= high; x++) {
		const s = String(x);
		if (
			[...s].every(
				(c, i) =>
					i === 0 || Math.abs(Number(c) - Number(s.charAt(i - 1))) === 1,
			)
		)
			count++;
	}
	return count;
};

describe("2801. Count Stepping Numbers in Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSteppingNumbers("1", "11")).toBe(10);
		expect(countSteppingNumbers("90", "101")).toBe(2);
	});

	it("matches checking every number on random ranges", () => {
		const random = createRandom(2801);
		for (let run = 0; run < 300; run++) {
			const low = random.int(1, 5000);
			const high = random.int(low, 6000);
			expect(countSteppingNumbers(String(low), String(high))).toBe(
				byBruteForce(low, high),
			);
		}
	});
});
