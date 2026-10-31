import { Heap } from "../../internal/heap";

/**
 * 3781. Maximum Score After Binary Swaps
 *
 * Positions holding a 1 in `s` score their `nums` value. You may swap a
 * "01" pair to "10", moving a 1 left, any number of times. Returns the
 * best score.
 *
 * Ones only move left, so sweep from the right: each 1 claims its value,
 * and each 0 position can take over the cheapest claim so far if it's
 * worth more, since that 1 could have moved here.
 *
 * @see https://leetcode.com/problems/maximum-score-after-binary-swaps/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumScoreAfterBinarySwaps([2, 1, 5, 2, 3], "01010"); // 7
 */
export const maximumScoreAfterBinarySwaps = (
	nums: readonly number[],
	s: string,
): number => {
	const claimed = new Heap<number>((a, b) => a - b);
	for (let i = nums.length - 1; i >= 0; i--) {
		const value = nums[i] ?? 0;
		if (s[i] === "1") claimed.push(value);
		else if (claimed.size > 0 && (claimed.peek() ?? 0) < value) {
			claimed.pop();
			claimed.push(value);
		}
	}
	let total = 0;
	while (claimed.size > 0) total += claimed.pop() ?? 0;
	return total;
};
