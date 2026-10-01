import { describe, expect, it } from "bun:test";
import { treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { numberOfWaysToReorderArrayToGetSameBst as numOfWays } from ".";

/** Builds the tree for every permutation and compares. */
const byBruteForce = (nums: number[]): number => {
	const target = JSON.stringify(treeToArray(bstFromValues(nums)));
	let count = 0;
	const permute = (prefix: number[], rest: number[]): void => {
		if (rest.length === 0) {
			if (JSON.stringify(treeToArray(bstFromValues(prefix))) === target)
				count++;
			return;
		}
		rest.forEach((value, i) => {
			permute(
				[...prefix, value],
				rest.filter((_, j) => j !== i),
			);
		});
	};
	permute([], nums);
	return count - 1;
};

describe("1569. Number of Ways to Reorder Array to Get Same BST", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfWays([2, 1, 3])).toBe(1);
		expect(numOfWays([3, 4, 5, 1, 2])).toBe(5);
		expect(numOfWays([1, 2, 3])).toBe(0);
	});

	it("handles a thousand values in sorted order", () => {
		expect(numOfWays(Array.from({ length: 1000 }, (_, i) => i + 1))).toBe(0);
	});

	it("matches trying every permutation on random inputs", () => {
		const random = createRandom(1569);
		for (let run = 0; run < 60; run++) {
			const n = random.int(1, 6);
			const nums = Array.from({ length: n }, (_, i) => i + 1).sort(
				() => random.next() - 0.5,
			);
			expect(numOfWays(nums)).toBe(byBruteForce(nums));
		}
	});
});
