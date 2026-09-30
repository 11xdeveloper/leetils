/**
 * 1300. Sum of Mutated Array Closest to Target
 *
 * Capping every element of `arr` at `value` changes its sum. Returns the
 * `value` making the sum closest to `target`, the smallest on ties.
 *
 * The capped sum never falls as `value` grows, so binary search for the
 * smallest `value` whose sum reaches `target`; the answer is it or the
 * value just below.
 *
 * @see https://leetcode.com/problems/sum-of-mutated-array-closest-to-target/
 * @difficulty Medium
 * @timeComplexity O(n log(max))
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfMutatedArrayClosestToTarget([4, 9, 3], 10); // 3
 */
export const sumOfMutatedArrayClosestToTarget = (
	arr: readonly number[],
	target: number,
): number => {
	const capped = (value: number) =>
		arr.reduce((sum, x) => sum + Math.min(x, value), 0);
	let [low, high] = [0, Math.max(...arr)];
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (capped(mid) >= target) high = mid;
		else low = mid + 1;
	}
	if (low === 0) return 0;
	return Math.abs(capped(low - 1) - target) <= Math.abs(capped(low) - target)
		? low - 1
		: low;
};
