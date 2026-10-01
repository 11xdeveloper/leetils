/**
 * 984. String Without AAA or BBB
 *
 * Returns a string of `a` letter `a`s and `b` letter `b`s with no `"aaa"`
 * or `"bbb"`. An answer is guaranteed; any is accepted.
 *
 * Greedy: write the letter with more remaining, unless the last two
 * letters are already that letter, in which case write the other one.
 *
 * @see https://leetcode.com/problems/string-without-aaa-or-bbb/
 * @difficulty Medium
 * @timeComplexity O(a + b)
 * @spaceComplexity O(a + b)
 *
 * @example
 * stringWithoutAaaOrBbb(4, 1); // "aabaa"
 */
export const stringWithoutAaaOrBbb = (a: number, b: number): string => {
	let result = "";
	while (a > 0 || b > 0) {
		const triple = (letter: string) => result.endsWith(letter + letter);
		const writeA =
			(a >= b && !triple("a")) || (triple("b") && a > 0) || b === 0;
		if (writeA) {
			result += "a";
			a--;
		} else {
			result += "b";
			b--;
		}
	}
	return result;
};
