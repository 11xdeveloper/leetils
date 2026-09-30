import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { binaryTreesWithFactors as numFactoredBinaryTrees } from ".";

/** Counts trees at each root recursively, without memoisation. */
const byRecursion = (arr: number[]): number => {
	const set = new Set(arr);
	const trees = (root: number): number => {
		let count = 1;
		for (const left of arr) {
			const right = root / left;
			if (Number.isInteger(right) && set.has(right))
				count += trees(left) * trees(right);
		}
		return count;
	};
	return arr.reduce((total, root) => total + trees(root), 0);
};

describe("823. Binary Trees With Factors", () => {
	it("solves the examples from the problem statement", () => {
		expect(numFactoredBinaryTrees([2, 4])).toBe(3);
		expect(numFactoredBinaryTrees([2, 4, 5, 10])).toBe(7);
	});

	it("matches recursion on random inputs", () => {
		const random = createRandom(823);
		for (let run = 0; run < 300; run++) {
			const arr = [...new Set(random.array(random.int(1, 8), 2, 40))];
			expect(numFactoredBinaryTrees(arr)).toBe(byRecursion(arr));
		}
	});

	it("reduces large counts modulo 10^9 + 7", () => {
		const powers = Array.from({ length: 30 }, (_, i) => 2 ** (i + 1));
		expect(numFactoredBinaryTrees(powers)).toBeWithin(0, 1_000_000_007);
	});
});
