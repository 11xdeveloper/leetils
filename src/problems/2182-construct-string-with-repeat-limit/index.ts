/**
 * 2182. Construct String With Repeat Limit
 *
 * Returns the lexicographically largest string using some of the letters
 * of `s` with no letter repeated more than `repeatLimit` times in a row.
 *
 * Greedily write the largest remaining letter up to the limit; when the
 * limit is hit, write one of the next largest letter to break the run.
 *
 * @see https://leetcode.com/problems/construct-string-with-repeat-limit/
 * @difficulty Medium
 * @timeComplexity O(n + 26)
 * @spaceComplexity O(n)
 *
 * @example
 * constructStringWithRepeatLimit("cczazcc", 3); // "zzcccac"
 */
export const constructStringWithRepeatLimit = (
	s: string,
	repeatLimit: number,
): string => {
	const counts = new Array<number>(26).fill(0);
	for (const char of s) {
		const code = char.charCodeAt(0) - 97;
		counts[code] = (counts[code] ?? 0) + 1;
	}
	const result: string[] = [];
	for (let letter = 25; letter >= 0; ) {
		const count = counts[letter] ?? 0;
		if (count === 0) {
			letter--;
			continue;
		}
		const run = Math.min(count, repeatLimit);
		result.push(String.fromCharCode(97 + letter).repeat(run));
		counts[letter] = count - run;
		if (counts[letter] === 0) continue;
		let breaker = letter - 1;
		while (breaker >= 0 && !counts[breaker]) breaker--;
		if (breaker < 0) break;
		result.push(String.fromCharCode(97 + breaker));
		counts[breaker] = (counts[breaker] ?? 0) - 1;
	}
	return result.join("");
};
