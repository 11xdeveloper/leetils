/**
 * 3013. Divide an Array Into Subarrays With Minimum Cost II
 *
 * Split `nums` into `k` contiguous subarrays, where a subarray costs its
 * first element, such that the second and last subarrays start at most
 * `dist` apart. Returns the smallest total cost.
 *
 * The first subarray starts at 0, and the other `k - 1` starts all lie in a
 * window of `dist + 1` positions after it. Slide that window along,
 * keeping the sum of its `k - 1` smallest elements with Fenwick trees of
 * counts and sums over the sorted values, and descend the count tree to
 * find where the smallest `k - 1` end.
 *
 * @see https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * divideAnArrayIntoSubarraysWithMinimumCostII([1, 3, 2, 6, 4, 2], 3, 3); // 5
 */
export const divideAnArrayIntoSubarraysWithMinimumCostII = (
	nums: readonly number[],
	k: number,
	dist: number,
): number => {
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const rank = new Map(values.map((value, i) => [value, i + 1]));
	const size = values.length;
	const counts = new Int32Array(size + 1);
	const sums = new Float64Array(size + 1);
	const update = (value: number, sign: number): void => {
		for (let i = rank.get(value) ?? 0; i <= size; i += i & -i) {
			counts[i] = (counts[i] ?? 0) + sign;
			sums[i] = (sums[i] ?? 0) + sign * value;
		}
	};
	let top = 1;
	while (top * 2 <= size) top *= 2;
	const smallestSum = (m: number): number => {
		let position = 0;
		let taken = 0;
		let total = 0;
		for (let step = top; step > 0; step >>= 1) {
			const next = position + step;
			if (next <= size && taken + (counts[next] ?? 0) < m) {
				position = next;
				taken += counts[next] ?? 0;
				total += sums[next] ?? 0;
			}
		}
		return total + (m - taken) * (values[position] ?? 0);
	};
	const need = k - 1;
	let best = Number.POSITIVE_INFINITY;
	for (let i = 1; i < nums.length; i++) {
		update(nums[i] ?? 0, 1);
		if (i - dist - 1 >= 1) update(nums[i - dist - 1] ?? 0, -1);
		if (i >= need) best = Math.min(best, smallestSum(need));
	}
	return (nums[0] ?? 0) + best;
};
