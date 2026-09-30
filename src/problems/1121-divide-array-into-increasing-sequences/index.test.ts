import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { divideArrayIntoIncreasingSequences as canDivideIntoSubsequences } from ".";

/** Tries every way of dealing the numbers into increasing subsequences. */
const byBruteForce = (nums: number[], k: number): boolean => {
	const groups: number[][] = [];
	const place = (i: number): boolean => {
		if (i === nums.length) return groups.every((group) => group.length >= k);
		const num = nums[i] ?? 0;
		for (const group of groups) {
			if ((group.at(-1) ?? -1) >= num) continue;
			group.push(num);
			if (place(i + 1)) return true;
			group.pop();
		}
		groups.push([num]);
		const found = place(i + 1);
		groups.pop();
		return found;
	};
	return place(0);
};

describe("1121. Divide Array Into Increasing Sequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(canDivideIntoSubsequences([1, 2, 2, 3, 3, 4, 4], 3)).toBeTrue();
		expect(canDivideIntoSubsequences([5, 6, 6, 7, 8], 3)).toBeFalse();
	});

	it("handles k = 1 and a single repeated value", () => {
		expect(canDivideIntoSubsequences([4, 4, 4], 1)).toBeTrue();
		expect(canDivideIntoSubsequences([4, 4, 4], 2)).toBeFalse();
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1121);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 1, 4).sort((a, b) => a - b);
			const k = random.int(1, nums.length);
			expect(canDivideIntoSubsequences(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
