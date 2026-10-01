/**
 * 555. Split Concatenated Strings
 *
 * The strings in `strs`, each optionally reversed, are joined in order into
 * a loop, which is then cut at any point to read it as a string. Returns
 * the lexicographically largest string this can produce.
 *
 * Every string not containing the cut should face whichever way is larger.
 * So it tries each string as the one containing the cut, both ways round
 * and at every position, with the others fixed at their larger orientation.
 *
 * @see https://leetcode.com/problems/split-concatenated-strings/
 * @difficulty Medium
 * @timeComplexity O(L^2) for total length L
 * @spaceComplexity O(L)
 *
 * @example
 * splitConcatenatedStrings(["abc", "xyz"]); // "zyxcba"
 */
export const splitConcatenatedStrings = (strs: readonly string[]): string => {
	const reverse = (text: string): string => [...text].reverse().join("");
	const best = strs.map((str) => {
		const reversed = reverse(str);
		return reversed > str ? reversed : str;
	});

	let largest = "";
	for (const [i, str] of strs.entries()) {
		const rest = best.slice(i + 1).join("") + best.slice(0, i).join("");
		for (const piece of [str, reverse(str)]) {
			for (let cut = 0; cut < piece.length; cut++) {
				const candidate = piece.slice(cut) + rest + piece.slice(0, cut);
				if (candidate > largest) largest = candidate;
			}
		}
	}

	return largest;
};
