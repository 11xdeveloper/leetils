/**
 * 3960. Frequency Balance Subarray
 *
 * A subarray is frequency balanced if it has one distinct value, or its
 * values all appear f or 2f times for some f, with both counts present.
 * Returns the longest such subarray's length.
 *
 * Extend from every start, tracking each value's count and how many
 * values have each count.
 *
 * @see https://leetcode.com/problems/frequency-balance-subarray/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * frequencyBalanceSubarray([1, 2, 2, 1, 2, 3, 3, 3]); // 5
 */
export const frequencyBalanceSubarray = (nums: readonly number[]): number => {
	let best = 0;
	for (let i = 0; i < nums.length; i++) {
		const counts = new Map<number, number>();
		const byCount = new Map<number, number>();
		const shift = (count: number, delta: number) => {
			const next = (byCount.get(count) ?? 0) + delta;
			if (next === 0) byCount.delete(count);
			else byCount.set(count, next);
		};
		for (let j = i; j < nums.length; j++) {
			const num = nums[j] ?? 0;
			const count = counts.get(num) ?? 0;
			if (count > 0) shift(count, -1);
			shift(count + 1, 1);
			counts.set(num, count + 1);
			let balanced = counts.size === 1;
			if (byCount.size === 2) {
				const [a = 0, b = 0] = [...byCount.keys()].sort((x, y) => x - y);
				balanced = b === 2 * a;
			}
			if (balanced) best = Math.max(best, j - i + 1);
		}
	}
	return best;
};
