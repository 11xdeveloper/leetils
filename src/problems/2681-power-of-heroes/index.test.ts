import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { powerOfHeroes as sumOfPower } from ".";

/** Sums every group's power. */
const byBruteForce = (nums: number[]): number => {
	let total = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const group = nums.filter((_, i) => (mask >> i) & 1);
		const max = Math.max(...group);
		total += max * max * Math.min(...group);
	}
	return total;
};

describe("2681. Power of Heroes", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfPower([2, 1, 4])).toBe(141);
		expect(sumOfPower([1, 1, 1])).toBe(7);
	});

	it("matches summing every group on random inputs", () => {
		const random = createRandom(2681);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 30);
			expect(sumOfPower(nums)).toBe(byBruteForce(nums));
		}
	});
});
