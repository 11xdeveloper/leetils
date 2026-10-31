import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToMakeArrayEqual as minCost } from ".";

describe("2448. Minimum Cost to Make Array Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost([1, 3, 5, 2], [2, 3, 1, 14])).toBe(8);
		expect(minCost([2, 2, 2, 2, 2], [4, 2, 8, 1, 3])).toBe(0);
	});

	it("matches trying every target on random inputs", () => {
		const random = createRandom(2448);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 8);
			const nums = random.array(n, 1, 20);
			const cost = random.array(n, 1, 10);
			let expected = Infinity;
			for (const target of nums) {
				const total = nums.reduce(
					(s, v, i) => s + Math.abs(v - target) * (cost[i] ?? 0),
					0,
				);
				expected = Math.min(expected, total);
			}
			expect(minCost(nums, cost)).toBe(expected);
		}
	});
});
