/**
 * 1405. Longest Happy String
 *
 * Returns a longest string with at most `a` `a`s, `b` `b`s and `c` `c`s
 * that never repeats a letter three times in a row.
 *
 * Greedy: always append the letter with the most copies left, unless the
 * last two characters are already that letter, in which case append the
 * next most plentiful instead; stop when neither works.
 *
 * @see https://leetcode.com/problems/longest-happy-string/
 * @difficulty Medium
 * @timeComplexity O(a + b + c)
 * @spaceComplexity O(a + b + c)
 *
 * @example
 * longestHappyString(7, 1, 0); // "aabaa"
 */
export const longestHappyString = (a: number, b: number, c: number): string => {
	const left: [string, number][] = [
		["a", a],
		["b", b],
		["c", c],
	];
	let result = "";
	for (;;) {
		left.sort((x, y) => y[1] - x[1]);
		const choice = left.find(
			([letter, count]) => count > 0 && !result.endsWith(letter + letter),
		);
		if (!choice) return result;
		result += choice[0];
		choice[1]--;
	}
};
