import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumValueToGetPositiveStepByStepSum as minStartValue } from ".";

/** Tries start values upwards. */
const byBruteForce = (nums: number[]): number => {
	for (let start = 1; ; start++) {
		let [sum, positive] = [start, true];
		for (const num of nums) {
			sum += num;
			if (sum < 1) positive = false;
		}
		if (positive) return start;
	}
};

describe("1413. Minimum Value to Get Positive Step by Step Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minStartValue([-3, 2, -3, 4, 2])).toBe(5);
		expect(minStartValue([1, 2])).toBe(1);
		expect(minStartValue([1, -2, -3])).toBe(5);
	});

	it("matches trying start values on random inputs", () => {
		const random = createRandom(1413);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -10, 10);
			expect(minStartValue(nums)).toBe(byBruteForce(nums));
		}
	});
});
