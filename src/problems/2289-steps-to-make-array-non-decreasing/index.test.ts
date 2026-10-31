import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stepsToMakeArrayNonDecreasing as totalSteps } from ".";

/** Simulates the steps. */
const bySimulation = (nums: number[]): number => {
	let steps = 0;
	for (;;) {
		const next = nums.filter((num, i) => i === 0 || (nums[i - 1] ?? 0) <= num);
		if (next.length === nums.length) return steps;
		nums = next;
		steps++;
	}
};

describe("2289. Steps to Make Array Non-decreasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalSteps([5, 3, 4, 4, 7, 3, 6, 11, 8, 5, 11])).toBe(3);
		expect(totalSteps([4, 5, 7, 7, 13])).toBe(0);
	});

	it("matches simulating on random inputs", () => {
		const random = createRandom(2289);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), 1, 8);
			expect(totalSteps(nums)).toBe(bySimulation(nums));
		}
	});
});
