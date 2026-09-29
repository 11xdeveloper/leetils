import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splitArrayIntoConsecutiveSubsequences as isPossible } from ".";

/** Places each number at the end of every compatible subsequence, or a new one, in turn. */
const byBruteForce = (nums: number[]): boolean => {
	const search = (index: number, subsequences: number[][]): boolean => {
		if (index === nums.length)
			return subsequences.every((sub) => sub.length >= 3);
		const num = nums[index] ?? 0;
		for (const sub of subsequences) {
			if (sub.at(-1) === num - 1) {
				sub.push(num);
				if (search(index + 1, subsequences)) return true;
				sub.pop();
			}
		}
		subsequences.push([num]);
		if (search(index + 1, subsequences)) return true;
		subsequences.pop();
		return false;
	};
	return search(0, []);
};

describe("659. Split Array into Consecutive Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(isPossible([1, 2, 3, 3, 4, 5])).toBeTrue();
		expect(isPossible([1, 2, 3, 3, 4, 4, 5, 5])).toBeTrue();
		expect(isPossible([1, 2, 3, 4, 4, 5])).toBeFalse();
	});

	it("matches trying every split on random sorted inputs", () => {
		const random = createRandom(659);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 10), 0, 5).sort((a, b) => a - b);
			expect(isPossible(nums)).toBe(byBruteForce(nums));
		}
	});
});
