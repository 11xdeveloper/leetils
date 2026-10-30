/**
 * 2780. Minimum Index of a Valid Split
 *
 * `nums` has a dominant element, appearing in more than half of it. A
 * split after index `i` is valid if that element also dominates both
 * parts. Returns the smallest valid `i`, or -1.
 *
 * Find the dominant element by counting, then scan splits keeping its
 * count on the left.
 *
 * @see https://leetcode.com/problems/minimum-index-of-a-valid-split/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumIndexOfAValidSplit([2, 1, 3, 1, 1, 1, 7, 1, 2, 1]); // 4
 */
export const minimumIndexOfAValidSplit = (nums: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let dominant = 0;
	let total = 0;
	for (const [value, count] of counts)
		if (count > total) {
			dominant = value;
			total = count;
		}
	const n = nums.length;
	let left = 0;
	for (let i = 0; i < n - 1; i++) {
		if (nums[i] === dominant) left++;
		if (2 * left > i + 1 && 2 * (total - left) > n - i - 1) return i;
	}
	return -1;
};
