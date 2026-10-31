import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumPulseValueAfterOneSubarrayRotation as maxValue } from ".";

/** Tries every rotation. */
const byBruteForce = (nums: number[]): number => {
	const pulse = (arr: number[]) =>
		arr.reduce((s, x, i) => (i % 2 === 0 ? s + x : s - x), 0);
	let best = pulse(nums);
	for (let l = 0; l < nums.length; l++)
		for (let r = l + 1; r < nums.length; r++)
			best = Math.max(
				best,
				pulse([
					...nums.slice(0, l),
					...nums.slice(l + 1, r + 1),
					nums[l] ?? 0,
					...nums.slice(r + 1),
				]),
			);
	return best;
};

describe("4058. Maximum Pulse Value After One Subarray Rotation", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValue([1, 5, 2])).toBe(6);
		expect(maxValue([6, 4, 3])).toBe(7);
		expect(maxValue([9, 7])).toBe(2);
	});

	it("matches trying every rotation on random arrays", () => {
		const random = createRandom(4058);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 9), -9, 9);
			expect(maxValue(nums)).toBe(byBruteForce(nums));
		}
	});
});
