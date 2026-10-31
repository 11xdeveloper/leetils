/**
 * 2053. Kth Distinct String in an Array
 *
 * Returns the `k`-th string, in order, that appears exactly once in
 * `arr`, or `""` if there are fewer than `k`.
 *
 * Count the strings, then walk the array.
 *
 * @see https://leetcode.com/problems/kth-distinct-string-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * kthDistinctStringInAnArray(["d", "b", "c", "b", "c", "a"], 2); // "a"
 */
export const kthDistinctStringInAnArray = (
	arr: readonly string[],
	k: number,
): string => {
	const counts = new Map<string, number>();
	for (const s of arr) counts.set(s, (counts.get(s) ?? 0) + 1);
	return arr.filter((s) => counts.get(s) === 1)[k - 1] ?? "";
};
