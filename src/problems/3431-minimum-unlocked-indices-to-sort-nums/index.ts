/**
 * 3431. Minimum Unlocked Indices to Sort Nums
 *
 * `nums` holds 1s, 2s and 3s, and neighbours at i and i + 1 can swap when
 * `nums[i]` is one more than `nums[i + 1]` and index i is unlocked. Returns
 * the fewest indices to unlock so `nums` can be sorted, or -1.
 *
 * A 3 can never pass a 1, so any 3 before a 1 makes it impossible.
 * Otherwise every index from the first 2 to before the last 1 must be
 * swappable, and likewise from the first 3 to before the last 2; count the
 * locked indices in those ranges.
 *
 * @see https://leetcode.com/problems/minimum-unlocked-indices-to-sort-nums/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumUnlockedIndicesToSortNums([1, 2, 1, 2, 3, 2], [1, 0, 1, 1, 0, 1]); // 0
 */
export const minimumUnlockedIndicesToSortNums = (
	nums: readonly number[],
	locked: readonly number[],
): number => {
	const n = nums.length;
	const first = (value: number): number => nums.indexOf(value);
	const last = (value: number): number => nums.lastIndexOf(value);
	if (first(3) !== -1 && first(3) < last(1)) return -1;
	const needed = new Uint8Array(n);
	for (const [big, small] of [
		[2, 1],
		[3, 2],
	] as const) {
		const from = first(big);
		const to = last(small);
		if (from === -1 || to === -1) continue;
		for (let i = from; i < to; i++) needed[i] = 1;
	}
	let unlocks = 0;
	for (let i = 0; i < n; i++) if (needed[i] && locked[i] === 1) unlocks++;
	return unlocks;
};
