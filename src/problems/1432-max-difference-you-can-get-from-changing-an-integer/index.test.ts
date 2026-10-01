import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxDifferenceYouCanGetFromChangingAnInteger as maxDiff } from ".";

/** Tries every replacement pair for both results. */
const byBruteForce = (num: number): number => {
	const results: number[] = [];
	for (let x = 0; x <= 9; x++) {
		for (let y = 0; y <= 9; y++) {
			const changed = String(num).replaceAll(String(x), String(y));
			if (!changed.startsWith("0")) results.push(Number(changed));
		}
	}
	return Math.max(...results) - Math.min(...results);
};

describe("1432. Max Difference You Can Get From Changing an Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDiff(555)).toBe(888);
		expect(maxDiff(9)).toBe(8);
	});

	it("keeps the leading digit non-zero", () => {
		expect(maxDiff(123456)).toBe(820000);
		expect(maxDiff(10000)).toBe(80000);
	});

	it("matches trying every replacement on random numbers", () => {
		const random = createRandom(1432);
		for (let run = 0; run < 500; run++) {
			const num = random.int(1, 10 ** random.int(1, 8));
			expect(maxDiff(num)).toBe(byBruteForce(num));
		}
	});
});
