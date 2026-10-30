import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfBeautifulIntegersInTheRange as numberOfBeautifulIntegers } from ".";

/** Checks every integer in the range. */
const byBruteForce = (low: number, high: number, k: number): number => {
	let count = 0;
	for (let x = low; x <= high; x++) {
		const digits = [...String(x)].map(Number);
		const even = digits.filter((d) => d % 2 === 0).length;
		if (2 * even === digits.length && x % k === 0) count++;
	}
	return count;
};

describe("2827. Number of Beautiful Integers in the Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfBeautifulIntegers(10, 20, 3)).toBe(2);
		expect(numberOfBeautifulIntegers(1, 10, 1)).toBe(1);
		expect(numberOfBeautifulIntegers(5, 5, 2)).toBe(0);
	});

	it("matches checking every integer on random ranges", () => {
		const random = createRandom(2827);
		for (let run = 0; run < 200; run++) {
			const low = random.int(1, 5000);
			const high = random.int(low, 12000);
			const k = random.int(1, 20);
			expect(numberOfBeautifulIntegers(low, high, k)).toBe(
				byBruteForce(low, high, k),
			);
		}
	});
});
