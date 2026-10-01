import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNumberOfSpecialSubsequences as countSpecialSubsequences } from ".";

describe("1955. Count Number of Special Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSpecialSubsequences([0, 1, 2, 2])).toBe(3);
		expect(countSpecialSubsequences([2, 2, 0, 0])).toBe(0);
		expect(countSpecialSubsequences([0, 1, 2, 0, 1, 2])).toBe(7);
	});

	it("matches checking every subsequence on random inputs", () => {
		const random = createRandom(1955);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 12), 0, 2);
			let count = 0;
			for (let mask = 1; mask < 1 << nums.length; mask++) {
				const sub = nums.filter((_, i) => mask & (1 << i)).join("");
				if (/^0+1+2+$/.test(sub)) count++;
			}
			expect(countSpecialSubsequences(nums)).toBe(count);
		}
	});
});
