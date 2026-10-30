/**
 * 2337. Move Pieces to Obtain a String
 *
 * Pieces "L" move left and "R" move right into blank "_" spaces. Returns
 * whether `start` can become `target`.
 *
 * Pieces can't pass each other, so the sequences must match, with each L
 * no further right in `target` and each R no further left.
 *
 * @see https://leetcode.com/problems/move-pieces-to-obtain-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * movePiecesToObtainAString("_L__R__R_", "L______RR"); // true
 */
export const movePiecesToObtainAString = (
	start: string,
	target: string,
): boolean => {
	const pieces = (s: string): [string, number][] =>
		[...s].flatMap((char, i): [string, number][] =>
			char === "_" ? [] : [[char, i]],
		);
	const [from, to] = [pieces(start), pieces(target)];
	return (
		from.length === to.length &&
		from.every(([piece, i], k) => {
			const [want, j] = to[k] ?? ["", 0];
			return piece === want && (piece === "L" ? i >= j : i <= j);
		})
	);
};
