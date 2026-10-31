/**
 * 3043. Find the Length of the Longest Common Prefix
 *
 * The longest common prefix, in digits, between any number in `arr1` and
 * any number in `arr2`, or 0 if none share a first digit.
 *
 * Store every prefix of every number in `arr1` (by repeatedly dropping the
 * last digit), then find each `arr2` number's longest stored prefix.
 *
 * @see https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix/
 * @difficulty Medium
 * @timeComplexity O((n + m) log max)
 * @spaceComplexity O(n log max)
 *
 * @example
 * findTheLengthOfTheLongestCommonPrefix([1, 10, 100], [1000]); // 3
 */
export const findTheLengthOfTheLongestCommonPrefix = (
	arr1: readonly number[],
	arr2: readonly number[],
): number => {
	const prefixes = new Set<number>();
	for (const num of arr1)
		for (let prefix = num; prefix > 0; prefix = Math.floor(prefix / 10))
			prefixes.add(prefix);
	let best = 0;
	for (const num of arr2)
		for (let prefix = num; prefix > 0; prefix = Math.floor(prefix / 10))
			if (prefixes.has(prefix)) {
				best = Math.max(best, String(prefix).length);
				break;
			}
	return best;
};
