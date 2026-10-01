/**
 * 1974. Minimum Time to Type Word Using Special Typewriter
 *
 * A circular typewriter starts on `a`; each second moves the pointer one
 * letter either way or types the current letter. Returns the least time to
 * type `word`.
 *
 * Move the shorter way around the circle before each letter.
 *
 * @see https://leetcode.com/problems/minimum-time-to-type-word-using-special-typewriter/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumTimeToTypeWordUsingSpecialTypewriter("bza"); // 7
 */
export const minimumTimeToTypeWordUsingSpecialTypewriter = (
	word: string,
): number => {
	let [time, at] = [0, 0];
	for (let i = 0; i < word.length; i++) {
		const letter = word.charCodeAt(i) - 97;
		const distance = Math.abs(letter - at);
		time += Math.min(distance, 26 - distance) + 1;
		at = letter;
	}
	return time;
};
