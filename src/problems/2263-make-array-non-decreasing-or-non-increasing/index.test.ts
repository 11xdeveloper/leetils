import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makeArrayNonDecreasingOrNonIncreasing as convertArray } from ".";

/** DP over the final values, which can be taken from the input. */
const byBruteForce = (nums: number[]): number => {
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const cost = (order: number[]): number => {
		let best = order.map(() => 0);
		for (const num of nums) {
			let running = Infinity;
			best = order.map((value, i) => {
				running = Math.min(running, best[i] ?? 0);
				return running + Math.abs(num - value);
			});
		}
		return Math.min(...best);
	};
	return Math.min(cost(values), cost(values.toReversed()));
};

describe("2263. Make Array Non-decreasing or Non-increasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(convertArray([3, 2, 4, 5, 0])).toBe(4);
		expect(convertArray([2, 2, 3, 4])).toBe(0);
		expect(convertArray([0])).toBe(0);
	});

	it("matches a DP over final values on random inputs", () => {
		const random = createRandom(2263);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 10);
			expect(convertArray(nums)).toBe(byBruteForce(nums));
		}
	});
});
