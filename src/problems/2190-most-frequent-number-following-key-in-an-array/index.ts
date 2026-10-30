/**
 * 2190. Most Frequent Number Following Key In an Array
 *
 * Returns the value that most often immediately follows `key` (it is
 * unique).
 *
 * Count the followers.
 *
 * @see https://leetcode.com/problems/most-frequent-number-following-key-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * mostFrequentNumberFollowingKeyInAnArray([1, 100, 200, 1, 100], 1); // 100
 */
export const mostFrequentNumberFollowingKeyInAnArray = (
	nums: readonly number[],
	key: number,
): number => {
	const counts = new Map<number, number>();
	let [best, bestCount] = [0, 0];
	for (let i = 1; i < nums.length; i++) {
		if (nums[i - 1] !== key) continue;
		const target = nums[i] ?? 0;
		const count = (counts.get(target) ?? 0) + 1;
		counts.set(target, count);
		if (count > bestCount) [best, bestCount] = [target, count];
	}
	return best;
};
