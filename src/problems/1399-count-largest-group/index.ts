/**
 * 1399. Count Largest Group
 *
 * Groups the numbers `1 … n` by digit sum and returns how many groups share
 * the largest size.
 *
 * Counts each digit sum, then how many counts equal the largest.
 *
 * @see https://leetcode.com/problems/count-largest-group/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * countLargestGroup(13); // 4
 */
export const countLargestGroup = (n: number): number => {
	const sizes = new Map<number, number>();
	for (let x = 1; x <= n; x++) {
		let sum = 0;
		for (let rest = x; rest > 0; rest = Math.floor(rest / 10)) sum += rest % 10;
		sizes.set(sum, (sizes.get(sum) ?? 0) + 1);
	}
	const largest = Math.max(...sizes.values());
	return [...sizes.values()].filter((size) => size === largest).length;
};
