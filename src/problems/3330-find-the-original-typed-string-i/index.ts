/**
 * 3330. Find the Original Typed String I
 *
 * Alice may have held one key down too long at most once, repeating a
 * letter. Returns how many strings she might have meant to type.
 *
 * She meant `word` itself, or one of the runs of repeated letters was
 * longer than intended: each extra copy in a run is another possibility.
 *
 * @see https://leetcode.com/problems/find-the-original-typed-string-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheOriginalTypedStringI("abbcccc"); // 5
 */
export const findTheOriginalTypedStringI = (word: string): number => {
	let possible = 1;
	for (let i = 1; i < word.length; i++) if (word[i] === word[i - 1]) possible++;
	return possible;
};
