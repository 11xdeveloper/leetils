/**
 * 2839. Check if Strings Can be Made Equal With Operations I
 *
 * An operation swaps the characters two apart in one of the length-4
 * strings. Returns whether operations can make them equal.
 *
 * Positions 0 and 2 can swap, as can 1 and 3, so each pair must match as
 * a set.
 *
 * @see https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-i/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfStringsCanBeMadeEqualWithOperationsI("abcd", "cdab"); // true
 */
export const checkIfStringsCanBeMadeEqualWithOperationsI = (
	s1: string,
	s2: string,
): boolean => {
	const pairMatches = (i: number): boolean => {
		const [a, b, c, d] = [
			s1.charAt(i),
			s1.charAt(i + 2),
			s2.charAt(i),
			s2.charAt(i + 2),
		];
		return (a === c && b === d) || (a === d && b === c);
	};
	return pairMatches(0) && pairMatches(1);
};
