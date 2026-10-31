import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findXValueOfArrayI as resultArray } from ".";

describe("3524. Find X Value of Array I", () => {
	it("solves the examples from the problem statement", () => {
		expect(resultArray([1, 2, 3, 4, 5], 3)).toEqual([9, 2, 4]);
		expect(resultArray([1, 2, 4, 8, 16, 32], 4)).toEqual([18, 1, 2, 0]);
		expect(resultArray([1, 1, 2, 1, 1], 2)).toEqual([9, 6]);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3524);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			const k = random.int(1, 5);
			const expected = new Array<number>(k).fill(0);
			for (let i = 0; i < nums.length; i++) {
				let product = 1;
				for (let j = i; j < nums.length; j++) {
					product = (product * (nums[j] ?? 0)) % k;
					expected[product] = (expected[product] ?? 0) + 1;
				}
			}
			expect(resultArray(nums, k)).toEqual(expected);
		}
	});
});
