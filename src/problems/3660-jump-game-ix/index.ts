/**
 * 3660. Jump Game IX
 *
 * From index i you may jump right to a smaller value or left to a larger
 * one. For each index, returns the largest value reachable from it.
 *
 * Everything up to i reaches the prefix maximum. A split between i and
 * i + 1 can be crossed (in both directions) exactly when the prefix
 * maximum exceeds the suffix minimum, so sweep from the right, inheriting
 * the answer across crossable splits.
 *
 * @see https://leetcode.com/problems/jump-game-ix/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * jumpGameIX([2, 3, 1]); // [3, 3, 3]
 */
export const jumpGameIX = (nums: readonly number[]): number[] => {
	const n = nums.length;
	const prefixMax: number[] = [];
	for (const num of nums)
		prefixMax.push(Math.max(prefixMax.at(-1) ?? num, num));
	const answer = new Array<number>(n);
	let suffixMin = Number.POSITIVE_INFINITY;
	for (let i = n - 1; i >= 0; i--) {
		answer[i] =
			(prefixMax[i] ?? 0) > suffixMin
				? (answer[i + 1] ?? 0)
				: (prefixMax[i] ?? 0);
		suffixMin = Math.min(suffixMin, nums[i] ?? 0);
	}
	return answer;
};
