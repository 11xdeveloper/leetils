import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestMissingGeneticValueInEachSubtree as smallestMissing } from ".";

/** Collects each subtree's values and scans for the first gap. */
const byBruteForce = (parents: number[], nums: number[]): number[] =>
	parents.map((_, node) => {
		const values = new Set<number>();
		for (const [other, value] of nums.entries()) {
			let ancestor = other;
			while (ancestor !== -1 && ancestor !== node)
				ancestor = parents[ancestor] ?? -1;
			if (ancestor === node) values.add(value);
		}
		let missing = 1;
		while (values.has(missing)) missing++;
		return missing;
	});

describe("2003. Smallest Missing Genetic Value in Each Subtree", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestMissing([-1, 0, 0, 2], [1, 2, 3, 4])).toEqual([5, 1, 1, 1]);
		expect(smallestMissing([-1, 0, 1, 0, 3, 3], [5, 4, 6, 2, 1, 3])).toEqual([
			7, 1, 1, 4, 2, 1,
		]);
		expect(
			smallestMissing([-1, 2, 3, 0, 2, 4, 1], [2, 3, 4, 5, 6, 7, 8]),
		).toEqual([1, 1, 1, 1, 1, 1, 1]);
	});

	it("matches checking every subtree on random trees", () => {
		const random = createRandom(2003);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 12);
			const parents = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const pool = Array.from({ length: n + 4 }, (_, i) => i + 1);
			const nums = Array.from(
				{ length: n },
				() => pool.splice(random.int(0, pool.length - 1), 1)[0] ?? 0,
			);
			expect(smallestMissing(parents, nums)).toEqual(
				byBruteForce(parents, nums),
			);
		}
	});
});
