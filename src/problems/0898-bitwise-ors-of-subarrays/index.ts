/**
 * 898. Bitwise ORs of Subarrays
 *
 * Returns how many distinct values the bitwise OR of a non-empty subarray
 * of `arr` can take.
 *
 * The ORs of subarrays ending at `i` come from those ending at `i - 1`,
 * each ORed with `arr[i]`, plus `arr[i]` alone. Each OR only gains bits as
 * the subarray grows left, so there are at most about 30 distinct ones per
 * end.
 *
 * @see https://leetcode.com/problems/bitwise-ors-of-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n · 30)
 * @spaceComplexity O(n · 30)
 *
 * @example
 * bitwiseOrsOfSubarrays([1, 1, 2]); // 3
 */
export const bitwiseOrsOfSubarrays = (arr: readonly number[]): number => {
	const all = new Set<number>();
	let ending = new Set<number>();
	for (const value of arr) {
		const next = new Set([value]);
		for (const or of ending) next.add(or | value);
		for (const or of next) all.add(or);
		ending = next;
	}
	return all.size;
};
