/**
 * 3748. Count Stable Subarrays
 *
 * A subarray is stable if it has no inversions, i.e. never decreases. For
 * each query `[l, r]`, counts the stable subarrays inside `nums[l..r]`.
 *
 * Each index's run start gives how many stable subarrays end there.
 * Within a query, the indices in l's own run end only l-based subarrays,
 * a triangle; the rest use prefix sums of the full run lengths.
 *
 * @see https://leetcode.com/problems/count-stable-subarrays/
 * @difficulty Hard
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * countStableSubarrays([3, 1, 2], [[0, 1], [1, 2], [0, 2]]); // [2, 3, 4]
 */
export const countStableSubarrays = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const runStart = new Int32Array(n);
	const runEnd = new Int32Array(n);
	for (let i = 1; i < n; i++)
		runStart[i] =
			(nums[i - 1] ?? 0) <= (nums[i] ?? 0) ? (runStart[i - 1] ?? 0) : i;
	runEnd[n - 1] = n - 1;
	for (let i = n - 2; i >= 0; i--)
		runEnd[i] = (nums[i] ?? 0) <= (nums[i + 1] ?? 0) ? (runEnd[i + 1] ?? 0) : i;
	// ending[i]: stable subarrays ending before index i.
	const ending = [0];
	for (let i = 0; i < n; i++)
		ending.push((ending[i] ?? 0) + i - (runStart[i] ?? 0) + 1);
	return queries.map(([l = 0, r = 0]) => {
		const split = Math.min(r, runEnd[l] ?? 0);
		const head = split - l + 1;
		return (
			(head * (head + 1)) / 2 + (ending[r + 1] ?? 0) - (ending[split + 1] ?? 0)
		);
	});
};
