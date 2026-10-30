import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { applyOperationsToMaximizeScore as maximumScore } from ".";

/** Lists every subarray's chosen element and takes the largest `k`. */
const byBruteForce = (nums: number[], k: number): number => {
	const primeScore = (x: number): number => {
		let count = 0;
		for (let p = 2; p <= x; p++)
			if (x % p === 0) {
				count++;
				while (x % p === 0) x /= p;
			}
		return count;
	};
	const chosen: number[] = [];
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			let best = i;
			for (let t = i; t <= j; t++)
				if (primeScore(nums[t] ?? 1) > primeScore(nums[best] ?? 1)) best = t;
			chosen.push(nums[best] ?? 1);
		}
	chosen.sort((a, b) => b - a);
	let score = 1n;
	for (const value of chosen.slice(0, k))
		score = (score * BigInt(value)) % 1_000_000_007n;
	return Number(score);
};

describe("2818. Apply Operations to Maximize Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumScore([8, 3, 9, 3, 8], 2)).toBe(81);
		expect(maximumScore([19, 12, 14, 6, 10, 18], 3)).toBe(4788);
	});

	it("matches listing every subarray on random inputs", () => {
		const random = createRandom(2818);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 8), 1, 60);
			const k = random.int(1, (nums.length * (nums.length + 1)) / 2);
			expect(maximumScore(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
