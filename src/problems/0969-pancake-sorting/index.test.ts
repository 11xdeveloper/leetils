import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pancakeSorting as pancakeSort } from ".";

const applyFlips = (arr: number[], flips: number[]): number[] => {
	const result = [...arr];
	for (const k of flips) result.splice(0, k, ...result.slice(0, k).reverse());
	return result;
};

describe("969. Pancake Sorting", () => {
	it("solves the examples from the problem statement", () => {
		expect(applyFlips([3, 2, 4, 1], pancakeSort([3, 2, 4, 1]))).toEqual([
			1, 2, 3, 4,
		]);
		expect(pancakeSort([1, 2, 3])).toEqual([]);
	});

	it("sorts random permutations within 10 · n flips", () => {
		const random = createRandom(969);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 20);
			const arr = Array.from({ length: n }, (_, i) => i + 1).sort(
				() => random.next() - 0.5,
			);
			const flips = pancakeSort(arr);
			expect(flips.length).toBeLessThanOrEqual(10 * n);
			for (const k of flips) expect(k).toBeWithin(1, n + 1);
			expect(applyFlips(arr, flips)).toEqual(
				Array.from({ length: n }, (_, i) => i + 1),
			);
		}
	});
});
