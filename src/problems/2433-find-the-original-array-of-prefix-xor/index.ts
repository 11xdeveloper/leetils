/**
 * 2433. Find The Original Array of Prefix Xor
 *
 * `pref[i]` is the XOR of `arr[0..i]`. Returns `arr`.
 *
 * Each element is the XOR of consecutive prefixes.
 *
 * @see https://leetcode.com/problems/find-the-original-array-of-prefix-xor/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * findTheOriginalArrayOfPrefixXor([5, 2, 0, 3, 1]); // [5, 7, 2, 3, 2]
 */
export const findTheOriginalArrayOfPrefixXor = (
	pref: readonly number[],
): number[] => pref.map((value, i) => value ^ (pref[i - 1] ?? 0));
