/**
 * 165. Compare Version Numbers
 *
 * Compares two version numbers made of dot-separated revisions, like
 * `"1.0.2"`. Returns -1 if `version1` is lower, 1 if it's higher, and 0 if
 * they're equal. Revisions are compared as integers, ignoring leading zeros,
 * and a missing revision counts as 0.
 *
 * @see https://leetcode.com/problems/compare-version-numbers/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * compareVersionNumbers("1.01", "1.001"); // 0
 * compareVersionNumbers("1.0", "1.0.0.0"); // 0
 * compareVersionNumbers("0.1", "1.1"); // -1
 */
export const compareVersionNumbers = (
	version1: string,
	version2: string,
): number => {
	const a = version1.split(".").map(Number);
	const b = version2.split(".").map(Number);

	for (let i = 0; i < Math.max(a.length, b.length); i++) {
		const difference = (a[i] ?? 0) - (b[i] ?? 0);
		if (difference !== 0) return Math.sign(difference);
	}

	return 0;
};
