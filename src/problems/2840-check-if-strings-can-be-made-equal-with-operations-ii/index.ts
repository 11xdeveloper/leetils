/**
 * 2840. Check if Strings Can be Made Equal With Operations II
 *
 * An operation swaps two characters of one string whose indices differ
 * by an even amount. Returns whether operations can make the two strings
 * equal.
 *
 * Characters at even and at odd indices can each be rearranged freely,
 * so compare their counts separately.
 *
 * @see https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfStringsCanBeMadeEqualWithOperationsII("abcdba", "cabdab"); // true
 */
export const checkIfStringsCanBeMadeEqualWithOperationsII = (
	s1: string,
	s2: string,
): boolean => {
	const balance = Array.from({ length: 52 }, () => 0);
	for (let i = 0; i < s1.length; i++) {
		const slot = (i % 2) * 26;
		balance[slot + s1.charCodeAt(i) - 97] =
			(balance[slot + s1.charCodeAt(i) - 97] ?? 0) + 1;
		balance[slot + s2.charCodeAt(i) - 97] =
			(balance[slot + s2.charCodeAt(i) - 97] ?? 0) - 1;
	}
	return balance.every((count) => count === 0);
};
