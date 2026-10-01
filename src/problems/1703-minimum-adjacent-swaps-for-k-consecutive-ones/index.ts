/**
 * 1703. Minimum Adjacent Swaps for K Consecutive Ones
 *
 * Returns the fewest swaps of adjacent elements that give the 0/1 array
 * `nums` `k` consecutive ones.
 *
 * Gather some `k` consecutive ones (by index among the ones). Shifting
 * each one's position by its index turns "make them consecutive" into
 * "make them equal", which costs the sum of distances to the median.
 * Prefix sums give that for every window.
 *
 * @see https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAdjacentSwapsForKConsecutiveOnes([1, 0, 0, 0, 0, 0, 1, 1], 3); // 5
 */
export const minimumAdjacentSwapsForKConsecutiveOnes = (
	nums: readonly number[],
	k: number,
): number => {
	const shifted: number[] = [];
	for (const [i, num] of nums.entries())
		if (num === 1) shifted.push(i - shifted.length);
	const prefix = [0];
	for (const value of shifted) prefix.push((prefix.at(-1) ?? 0) + value);
	const sum = (from: number, to: number) =>
		(prefix[to] ?? 0) - (prefix[from] ?? 0);
	let best = Infinity;
	for (let start = 0; start + k <= shifted.length; start++) {
		const mid = start + Math.floor(k / 2);
		const median = shifted[mid] ?? 0;
		const left = median * (mid - start) - sum(start, mid);
		const right = sum(mid + 1, start + k) - median * (start + k - mid - 1);
		best = Math.min(best, left + right);
	}
	return best;
};
