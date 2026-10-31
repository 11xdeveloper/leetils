/**
 * 3014. Minimum Number of Pushes to Type Word I
 *
 * Map the letters to the eight phone keys 2–9 however you like, where the
 * j-th letter on a key takes j pushes. Returns the fewest pushes needed to
 * type `word`.
 *
 * Give the most frequent letters the first slot on each key, the next eight
 * the second slot, and so on.
 *
 * @see https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfPushesToTypeWordI("xyzxyzxyzxyz"); // 12
 */
export const minimumNumberOfPushesToTypeWordI = (word: string): number => {
	const counts = new Array<number>(26).fill(0);
	for (let i = 0; i < word.length; i++)
		counts[word.charCodeAt(i) - 97] =
			(counts[word.charCodeAt(i) - 97] ?? 0) + 1;
	counts.sort((a, b) => b - a);
	return counts.reduce(
		(total, count, i) => total + count * (Math.floor(i / 8) + 1),
		0,
	);
};
