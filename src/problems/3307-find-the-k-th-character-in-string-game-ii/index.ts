/**
 * 3307. Find the K-th Character in String Game II
 *
 * Start with `"a"`. For each operation, append a copy of the word, with
 * every letter moved one place on if the operation is 1 ('z' wraps to
 * 'a'). Returns the `k`-th letter, for k up to 10¹⁴.
 *
 * Bit i of k - 1 says whether the position fell in the copy made by
 * operation i, so its shift is the number of set bits whose operation is 1.
 *
 * @see https://leetcode.com/problems/find-the-k-th-character-in-string-game-ii/
 * @difficulty Hard
 * @timeComplexity O(log k)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheKThCharacterInStringGameII(10, [0, 1, 0, 1]); // "b"
 */
export const findTheKThCharacterInStringGameII = (
	k: number,
	operations: readonly number[],
): string => {
	let shifts = 0;
	for (let rest = k - 1, bit = 0; rest > 0; rest = Math.floor(rest / 2), bit++)
		if (rest % 2 === 1) shifts += operations[bit] ?? 0;
	return String.fromCharCode(97 + (shifts % 26));
};
