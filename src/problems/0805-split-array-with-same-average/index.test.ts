import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splitArrayWithSameAverage as splitArraySameAverage } from ".";

const byBruteForce = (nums: number[]): boolean => {
	const n = nums.length;
	const total = nums.reduce((a, b) => a + b, 0);
	for (let mask = 1; mask < (1 << n) - 1; mask++) {
		const chosen = nums.filter((_, i) => mask & (1 << i));
		if (chosen.reduce((a, b) => a + b, 0) * n === total * chosen.length)
			return true;
	}
	return false;
};

describe("805. Split Array With Same Average", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitArraySameAverage([1, 2, 3, 4, 5, 6, 7, 8])).toBeTrue();
		expect(splitArraySameAverage([3, 1])).toBeFalse();
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(805);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 0, 20);
			expect(splitArraySameAverage(nums)).toBe(byBruteForce(nums));
		}
	});

	it("handles thirty numbers quickly", () => {
		const nums = Array.from({ length: 30 }, (_, i) => (i * 7919) % 10_001);
		expect(typeof splitArraySameAverage(nums)).toBe("boolean");
	});
});
