import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPairsWithXorInARange as countPairs } from ".";

describe("1803. Count Pairs With XOR in a Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPairs([1, 4, 2, 7], 2, 6)).toBe(6);
		expect(countPairs([9, 8, 4, 2, 1], 5, 14)).toBe(8);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1803);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 15), 1, 20000);
			const low = random.int(1, 20000);
			const high = random.int(low, 20000);
			let pairs = 0;
			for (let i = 0; i < nums.length; i++) {
				for (let j = i + 1; j < nums.length; j++) {
					const xor = (nums[i] ?? 0) ^ (nums[j] ?? 0);
					if (xor >= low && xor <= high) pairs++;
				}
			}
			expect(countPairs(nums, low, high)).toBe(pairs);
		}
	});
});
