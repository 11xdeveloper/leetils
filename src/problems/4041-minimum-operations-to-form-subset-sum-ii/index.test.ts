import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToFormSubsetSumII as minOperations } from ".";

/** Breadth-first search over each element's values, then every subset. */
const byBruteForce = (nums: number[], sum: number): number => {
	const reach = nums.map((x) => {
		const cost = new Map([[x, 0]]);
		const queue = [x];
		for (let q = 0; q < queue.length; q++) {
			const v = queue[q] ?? 0;
			for (const w of [2 * v, Math.floor(v / 2)])
				if (w <= 4 * sum + 4 && !cost.has(w)) {
					cost.set(w, (cost.get(v) ?? 0) + 1);
					queue.push(w);
				}
		}
		return cost;
	});
	let best = Number.POSITIVE_INFINITY;
	const go = (i: number, left: number, ops: number): void => {
		if (left === 0) best = Math.min(best, ops);
		if (i === nums.length || left < 0) return;
		go(i + 1, left, ops);
		for (const [v, c] of reach[i] ?? [])
			if (v > 0 && v <= left) go(i + 1, left - v, ops + c);
	};
	go(0, sum, 0);
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};

describe("4041. Minimum Operations to Form Subset Sum II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([10, 2], 13)).toBe(3);
		expect(minOperations([6, 3], 8)).toBe(2);
		expect(minOperations([2, 2], 7)).toBe(-1);
	});

	it("matches searching every value on random input", () => {
		const random = createRandom(4041);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 4), 1, 12);
			const sum = random.int(1, 25);
			expect(minOperations(nums, sum)).toBe(byBruteForce(nums, sum));
		}
	});
});
