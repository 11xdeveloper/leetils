import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostTreeFromLeafValues as mctFromLeafValues } from ".";

/** Interval dynamic programming over every choice of root split. */
const byBruteForce = (arr: number[]): number => {
	const n = arr.length;
	const cost = Array.from({ length: n }, () => new Array<number>(n).fill(0));
	for (let length = 2; length <= n; length++) {
		for (let i = 0; i + length - 1 < n; i++) {
			const j = i + length - 1;
			let best = Infinity;
			for (let k = i; k < j; k++) {
				const left = Math.max(...arr.slice(i, k + 1));
				const right = Math.max(...arr.slice(k + 1, j + 1));
				best = Math.min(
					best,
					(cost[i]?.[k] ?? 0) + (cost[k + 1]?.[j] ?? 0) + left * right,
				);
			}
			const row = cost[i];
			if (row) row[j] = best;
		}
	}
	return cost[0]?.[n - 1] ?? 0;
};

describe("1130. Minimum Cost Tree From Leaf Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(mctFromLeafValues([6, 2, 4])).toBe(32);
		expect(mctFromLeafValues([4, 11])).toBe(44);
	});

	it("handles equal values", () => {
		expect(mctFromLeafValues([3, 3, 3])).toBe(18);
	});

	it("matches interval dynamic programming on random inputs", () => {
		const random = createRandom(1130);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(2, 12), 1, 15);
			expect(mctFromLeafValues(arr)).toBe(byBruteForce(arr));
		}
	});
});
