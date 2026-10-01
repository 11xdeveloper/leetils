import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findKClosestElements as findClosestElements } from ".";

const bySorting = (arr: number[], k: number, x: number): number[] =>
	arr
		.toSorted((a, b) => Math.abs(a - x) - Math.abs(b - x) || a - b)
		.slice(0, k)
		.sort((a, b) => a - b);

describe("658. Find K Closest Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(findClosestElements([1, 2, 3, 4, 5], 4, 3)).toEqual([1, 2, 3, 4]);
		expect(findClosestElements([1, 1, 2, 3, 4, 5], 4, -1)).toEqual([
			1, 1, 2, 3,
		]);
	});

	it("matches sorting by distance on random inputs", () => {
		const random = createRandom(658);
		for (let run = 0; run < 1000; run++) {
			const arr = random
				.array(random.int(1, 12), -10, 10)
				.sort((a, b) => a - b);
			const k = random.int(1, arr.length);
			const x = random.int(-15, 15);
			expect(findClosestElements(arr, k, x)).toEqual(bySorting(arr, k, x));
		}
	});
});
