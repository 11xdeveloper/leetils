import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeSumOfArrayAfterKNegations as largestSumAfterKNegations } from ".";

/** Tries every sequence of negations, keeping the best sums per state. */
const bySearch = (nums: number[], k: number): number => {
	let states = new Set([nums.join()]);
	for (let step = 0; step < k; step++) {
		const next = new Set<string>();
		for (const state of states) {
			const values = state.split(",").map(Number);
			for (let i = 0; i < values.length; i++)
				next.add(values.with(i, -(values[i] ?? 0)).join());
		}
		states = next;
	}
	return Math.max(
		...[...states].map((state) =>
			state
				.split(",")
				.map(Number)
				.reduce((a, b) => a + b, 0),
		),
	);
};

describe("1005. Maximize Sum Of Array After K Negations", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestSumAfterKNegations([4, 2, 3], 1)).toBe(5);
		expect(largestSumAfterKNegations([3, -1, 0, 2], 3)).toBe(6);
		expect(largestSumAfterKNegations([2, -3, -1, 5, -4], 2)).toBe(13);
	});

	it("matches trying every sequence of negations on random inputs", () => {
		const random = createRandom(1005);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 5), -5, 5);
			const k = random.int(1, 5);
			expect(largestSumAfterKNegations(nums, k)).toBe(bySearch(nums, k));
		}
	});
});
