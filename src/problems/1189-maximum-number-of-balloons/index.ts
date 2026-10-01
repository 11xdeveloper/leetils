/**
 * 1189. Maximum Number of Balloons
 *
 * Returns how many copies of the word "balloon" can be spelled with the
 * letters of `text`, each used at most once.
 *
 * Counts the letters; each copy needs one `b`, `a` and `n` and two `l`s and
 * `o`s, so the scarcest of those limits the answer.
 *
 * @see https://leetcode.com/problems/maximum-number-of-balloons/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfBalloons("loonbalxballpoon"); // 2
 */
export const maximumNumberOfBalloons = (text: string): number => {
	const counts = new Map<string, number>();
	for (const char of text) counts.set(char, (counts.get(char) ?? 0) + 1);
	const needed = { b: 1, a: 1, l: 2, o: 2, n: 1 };
	return Math.min(
		...Object.entries(needed).map(([letter, per]) =>
			Math.floor((counts.get(letter) ?? 0) / per),
		),
	);
};
