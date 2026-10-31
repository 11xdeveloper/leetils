/**
 * 3106. Lexicographically Smallest String After Operations With Constraint
 *
 * The lexicographically smallest string `t` within distance `k` of `s`,
 * where the distance adds up each position's cyclic distance between
 * letters ('a' and 'z' are 1 apart).
 *
 * Greedily from the left, turn each letter into 'a' if the budget covers
 * it, and otherwise move it down as far as the budget allows.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-string-after-operations-with-constraint/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestStringAfterOperationsWithConstraint("zbbz", 3); // "aaaz"
 */
export const lexicographicallySmallestStringAfterOperationsWithConstraint = (
	s: string,
	k: number,
): string => {
	let budget = k;
	return [...s]
		.map((char) => {
			const offset = char.charCodeAt(0) - 97;
			const toA = Math.min(offset, 26 - offset);
			if (toA <= budget) {
				budget -= toA;
				return "a";
			}
			const moved = String.fromCharCode(97 + offset - budget);
			budget = 0;
			return moved;
		})
		.join("");
};
