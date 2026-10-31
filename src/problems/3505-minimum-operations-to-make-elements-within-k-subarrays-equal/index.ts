/**
 * 3505. Minimum Operations to Make Elements Within K Subarrays Equal
 *
 * The fewest ±1 steps to make `k` non-overlapping subarrays of length `x`
 * each all equal.
 *
 * Price every length-x window by moving everything to its median, using
 * Fenwick trees of counts and sums over the sorted values as the window
 * slides. Then dynamic programming chooses k non-overlapping windows.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-elements-within-k-subarrays-equal/
 * @difficulty Hard
 * @timeComplexity O(n log n + n · k)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeElementsWithinKSubarraysEqual([5, -2, 1, 3, 7, 3, 6, 4, -1], 3, 2); // 8
 */
export const minimumOperationsToMakeElementsWithinKSubarraysEqual = (
	nums: readonly number[],
	x: number,
	k: number,
): number => {
	const n = nums.length;
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const rank = new Map(values.map((v, i) => [v, i + 1]));
	const size = values.length;
	const counts = new Float64Array(size + 1);
	const sums = new Float64Array(size + 1);
	const update = (value: number, sign: number): void => {
		for (let i = rank.get(value) ?? 0; i <= size; i += i & -i) {
			counts[i] = (counts[i] ?? 0) + sign;
			sums[i] = (sums[i] ?? 0) + sign * value;
		}
	};
	let top = 1;
	while (top * 2 <= size) top *= 2;
	const kth = (m: number): [number, number, number] => {
		let position = 0;
		let before = 0;
		let sum = 0;
		for (let step = top; step > 0; step >>= 1) {
			const next = position + step;
			if (next <= size && before + (counts[next] ?? 0) < m) {
				position = next;
				before += counts[next] ?? 0;
				sum += sums[next] ?? 0;
			}
		}
		return [values[position] ?? 0, before, sum];
	};
	// window[i]: cost of the window ending at i.
	const window = new Float64Array(n).fill(Number.POSITIVE_INFINITY);
	let windowSum = 0;
	nums.forEach((num, i) => {
		update(num, 1);
		windowSum += num;
		if (i >= x) {
			update(nums[i - x] ?? 0, -1);
			windowSum -= nums[i - x] ?? 0;
		}
		if (i < x - 1) return;
		const [median, below, belowSum] = kth(Math.ceil(x / 2));
		window[i] =
			median * below - belowSum + (windowSum - belowSum) - median * (x - below);
	});
	let best = new Float64Array(n + 1);
	for (let j = 1; j <= k; j++) {
		const next = new Float64Array(n + 1).fill(Number.POSITIVE_INFINITY);
		for (let i = 1; i <= n; i++) {
			next[i] = next[i - 1] ?? Number.POSITIVE_INFINITY;
			if (i >= x)
				next[i] = Math.min(
					next[i] ?? 0,
					(best[i - x] ?? 0) + (window[i - 1] ?? 0),
				);
		}
		best = next;
	}
	return best[n] ?? 0;
};
