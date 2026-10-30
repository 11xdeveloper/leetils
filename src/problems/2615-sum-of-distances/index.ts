/**
 * 2615. Sum of Distances
 *
 * Returns, for each index `i`, the sum of `|i - j|` over the other
 * indices `j` holding the same value.
 *
 * Sweep left to right and then right to left, tracking for each value how
 * many indices have been seen and their sum.
 *
 * @see https://leetcode.com/problems/sum-of-distances/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfDistances([1, 3, 1, 1, 2]); // [5, 0, 3, 4, 0]
 */
export const sumOfDistances = (nums: readonly number[]): number[] => {
	const n = nums.length;
	const answer = nums.map(() => 0);
	for (const forward of [true, false]) {
		const seen = new Map<number, [count: number, sum: number]>();
		for (let step = 0; step < n; step++) {
			const i = forward ? step : n - 1 - step;
			const value = nums[i] ?? 0;
			const [count, sum] = seen.get(value) ?? [0, 0];
			answer[i] = (answer[i] ?? 0) + Math.abs(count * i - sum);
			seen.set(value, [count + 1, sum + i]);
		}
	}
	return answer;
};
