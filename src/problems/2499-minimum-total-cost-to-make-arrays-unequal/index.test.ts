import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTotalCostToMakeArraysUnequal as minimumTotalCost } from ".";

/** Uniform-cost search over swaps. */
const byBruteForce = (nums1: number[], nums2: number[]): number => {
	const n = nums1.length;
	const done = (state: number[]): boolean =>
		state.every((v, i) => v !== nums2[i]);
	const best = new Map([[nums1.join(","), 0]]);
	const frontier: [number, number[]][] = [[0, nums1]];
	while (frontier.length) {
		frontier.sort((a, b) => a[0] - b[0]);
		const [cost, state] = frontier.shift() ?? [0, []];
		if ((best.get(state.join(",")) ?? Infinity) < cost) continue;
		if (done(state)) return cost;
		for (let i = 0; i < n; i++)
			for (let j = i + 1; j < n; j++) {
				const next = [...state];
				[next[i], next[j]] = [next[j] ?? 0, next[i] ?? 0];
				const key = next.join(",");
				if ((best.get(key) ?? Infinity) <= cost + i + j) continue;
				best.set(key, cost + i + j);
				frontier.push([cost + i + j, next]);
			}
	}
	return -1;
};

describe("2499. Minimum Total Cost to Make Arrays Unequal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTotalCost([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBe(10);
		expect(minimumTotalCost([2, 2, 2, 1, 3], [1, 2, 2, 3, 3])).toBe(10);
		expect(minimumTotalCost([1, 2, 2], [1, 2, 2])).toBe(-1);
	});

	it("matches a search over swaps on random arrays", () => {
		const random = createRandom(2499);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 5);
			const nums1 = random.array(n, 1, 3);
			const nums2 = random.array(n, 1, 3);
			expect(minimumTotalCost(nums1, nums2)).toBe(byBruteForce(nums1, nums2));
		}
	});
});
