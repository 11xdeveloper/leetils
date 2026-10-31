/**
 * 2654. Minimum Number of Operations to Make All Array Elements Equal to 1
 *
 * An operation replaces one of two adjacent elements with their gcd.
 * Returns the fewest operations to make every element 1, or -1 if that's
 * impossible.
 *
 * Once there's a 1 it spreads one element per operation. With none,
 * first make one: the shortest subarray with gcd 1, of length `L`, takes
 * `L - 1` operations.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1/
 * @difficulty Medium
 * @timeComplexity O(n² log m), where `m` is the largest value
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfOperationsToMakeAllArrayElementsEqualTo1([2, 6, 3, 4]); // 4
 */
export const minimumNumberOfOperationsToMakeAllArrayElementsEqualTo1 = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const ones = nums.filter((num) => num === 1).length;
	if (ones > 0) return n - ones;

	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	let shortest = Number.POSITIVE_INFINITY;
	for (let i = 0; i < n; i++) {
		let g = nums[i] ?? 0;
		for (let j = i + 1; j < n && j - i < shortest; j++) {
			g = gcd(g, nums[j] ?? 0);
			if (g === 1) shortest = j - i;
		}
	}
	return shortest === Number.POSITIVE_INFINITY ? -1 : shortest + n - 1;
};
