/**
 * 2191. Sort the Jumbled Numbers
 *
 * `mapping[d]` replaces digit `d`. Sorts `nums` by their mapped values,
 * keeping the original order on ties.
 *
 * Map each number once, then sort stably.
 *
 * @see https://leetcode.com/problems/sort-the-jumbled-numbers/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortTheJumbledNumbers([8, 9, 4, 0, 2, 1, 3, 5, 7, 6], [991, 338, 38]); // [338, 38, 991]
 */
export const sortTheJumbledNumbers = (
	mapping: readonly number[],
	nums: readonly number[],
): number[] => {
	const mapped = nums.map((num) =>
		Number(Array.from(String(num), (digit) => mapping[Number(digit)]).join("")),
	);
	return nums
		.map((_, i) => i)
		.sort((a, b) => (mapped[a] ?? 0) - (mapped[b] ?? 0))
		.map((i) => nums[i] ?? 0);
};
