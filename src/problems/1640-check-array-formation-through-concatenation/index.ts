/**
 * 1640. Check Array Formation Through Concatenation
 *
 * `pieces` hold distinct integers. Returns whether concatenating them in
 * some order, without reordering inside a piece, gives `arr`.
 *
 * Each value starts at most one piece, so walk `arr`, looking up the piece
 * starting at the current value and checking that it matches.
 *
 * @see https://leetcode.com/problems/check-array-formation-through-concatenation/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(p) for p pieces
 *
 * @example
 * checkArrayFormationThroughConcatenation([91, 4, 64, 78], [[78], [4, 64], [91]]); // true
 */
export const checkArrayFormationThroughConcatenation = (
	arr: readonly number[],
	pieces: readonly (readonly number[])[],
): boolean => {
	const byFirst = new Map(pieces.map((piece) => [piece[0], piece]));
	for (let i = 0; i < arr.length; ) {
		const piece = byFirst.get(arr[i]);
		if (!piece) return false;
		for (const value of piece) {
			if (arr[i] !== value) return false;
			i++;
		}
	}
	return true;
};
