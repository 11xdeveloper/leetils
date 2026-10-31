import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { mergeAdjacentEqualElements as mergeAdjacent } from ".";

/** Merges the leftmost pair until none is left. */
const byBruteForce = (nums: number[]): number[] => {
	const arr = [...nums];
	for (;;) {
		const i = arr.findIndex((x, j) => j + 1 < arr.length && x === arr[j + 1]);
		if (i < 0) return arr;
		arr.splice(i, 2, (arr[i] ?? 0) * 2);
	}
};

describe("3834. Merge Adjacent Equal Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(mergeAdjacent([3, 1, 1, 2])).toEqual([3, 4]);
		expect(mergeAdjacent([2, 2, 4])).toEqual([8]);
		expect(mergeAdjacent([3, 7, 5])).toEqual([3, 7, 5]);
	});

	it("matches merging step by step on random arrays", () => {
		const random = createRandom(3834);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 4);
			expect(mergeAdjacent(nums)).toEqual(byBruteForce(nums));
		}
	});
});
