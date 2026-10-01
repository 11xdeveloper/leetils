import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumGeneticDifferenceQuery as maxGeneticDifference } from ".";

describe("1938. Maximum Genetic Difference Query", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxGeneticDifference(
				[-1, 0, 1, 1],
				[
					[0, 2],
					[3, 2],
					[2, 5],
				],
			),
		).toEqual([2, 3, 7]);
		expect(
			maxGeneticDifference(
				[3, 7, -1, 2, 0, 7, 0, 2],
				[
					[4, 6],
					[1, 15],
					[0, 5],
				],
			),
		).toEqual([6, 14, 7]);
	});

	it("matches walking up to the root on random trees", () => {
		const random = createRandom(1938);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 15);
			const order = Array.from({ length: n }, (_, i) => i).sort(
				() => random.int(0, 2) - 1,
			);
			const parents = new Array<number>(n).fill(-1);
			for (let i = 1; i < n; i++)
				parents[order[i] ?? 0] = order[random.int(0, i - 1)] ?? 0;
			const queries = Array.from({ length: 6 }, () => [
				random.int(0, n - 1),
				random.int(0, 200000),
			]);
			const expected = queries.map(([node = 0, val = 0]) => {
				let best = 0;
				for (let x = node; x !== -1; x = parents[x] ?? -1)
					best = Math.max(best, val ^ x);
				return best;
			});
			expect(maxGeneticDifference(parents, queries)).toEqual(expected);
		}
	});
});
