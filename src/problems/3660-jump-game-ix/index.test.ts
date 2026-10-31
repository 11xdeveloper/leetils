import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { jumpGameIX as maxValue } from ".";

/** Searches the jumps from every index. */
const byBruteForce = (nums: number[]): number[] =>
	nums.map((_, start) => {
		const seen = new Set([start]);
		const stack = [start];
		let best = nums[start] ?? 0;
		while (stack.length > 0) {
			const i = stack.pop() ?? 0;
			best = Math.max(best, nums[i] ?? 0);
			nums.forEach((value, j) => {
				const ok =
					j > i ? value < (nums[i] ?? 0) : j < i && value > (nums[i] ?? 0);
				if (ok && !seen.has(j)) {
					seen.add(j);
					stack.push(j);
				}
			});
		}
		return best;
	});

describe("3660. Jump Game IX", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValue([2, 1, 3])).toEqual([2, 2, 3]);
		expect(maxValue([2, 3, 1])).toEqual([3, 3, 3]);
	});

	it("matches searching the jumps on random arrays", () => {
		const random = createRandom(3660);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 8);
			expect(maxValue(nums)).toEqual(byBruteForce(nums));
		}
	});
});
