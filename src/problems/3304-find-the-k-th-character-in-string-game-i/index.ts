/**
 * 3304. Find the K-th Character in String Game I
 *
 * Start with `"a"` and repeatedly append a copy of the word with every
 * letter moved one place on ('z' wraps to 'a'). Returns the `k`-th letter.
 *
 * Position k - 1 (from 0) has been shifted once for every set bit in its
 * binary form, since each bit marks a copy it fell in the second half of.
 *
 * @see https://leetcode.com/problems/find-the-k-th-character-in-string-game-i/
 * @difficulty Easy
 * @timeComplexity O(log k)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheKThCharacterInStringGameI(5); // "b"
 */
export const findTheKThCharacterInStringGameI = (k: number): string => {
	let shifts = 0;
	for (let rest = k - 1; rest; rest &= rest - 1) shifts++;
	return String.fromCharCode(97 + (shifts % 26));
};
