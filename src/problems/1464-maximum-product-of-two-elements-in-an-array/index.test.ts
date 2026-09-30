import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProductOfTwoElementsInAnArray as maxProduct } from ".";

describe("1464. Maximum Product of Two Elements in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProduct([3, 4, 5, 2])).toBe(12);
		expect(maxProduct([1, 5, 4, 5])).toBe(16);
		expect(maxProduct([3, 7])).toBe(12);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1464);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 10), 1, 30);
			let best = 0;
			for (let i = 0; i < nums.length; i++) {
				for (let j = i + 1; j < nums.length; j++)
					best = Math.max(best, ((nums[i] ?? 0) - 1) * ((nums[j] ?? 0) - 1));
			}
			expect(maxProduct(nums)).toBe(best);
		}
	});
});
