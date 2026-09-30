import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reduceArraySizeToTheHalf as minSetSize } from ".";

/** Tries every set of distinct values. */
const byBruteForce = (arr: number[]): number => {
	const values = [...new Set(arr)];
	let best = Infinity;
	for (let mask = 1; mask < 2 ** values.length; mask++) {
		const chosen = new Set(values.filter((_, i) => mask & (1 << i)));
		const removed = arr.filter((value) => chosen.has(value)).length;
		if (2 * removed >= arr.length) best = Math.min(best, chosen.size);
	}
	return best;
};

describe("1338. Reduce Array Size to The Half", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSetSize([3, 3, 3, 3, 5, 5, 5, 2, 2, 7])).toBe(2);
		expect(minSetSize([7, 7, 7, 7, 7, 7])).toBe(1);
	});

	it("matches trying every set on random inputs", () => {
		const random = createRandom(1338);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(2 * random.int(1, 6), 1, 8);
			expect(minSetSize(arr)).toBe(byBruteForce(arr));
		}
	});
});
