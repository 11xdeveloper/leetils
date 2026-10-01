/**
 * 1663. Smallest String With A Given Numeric Value
 *
 * Returns the lexicographically smallest string of `n` lowercase letters
 * whose letter values (`a` = 1 … `z` = 26) sum to `k`.
 *
 * Fill from the back with the largest letter that still leaves at least
 * 1 for every earlier position.
 *
 * @see https://leetcode.com/problems/smallest-string-with-a-given-numeric-value/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestStringWithAGivenNumericValue(5, 73); // "aaszz"
 */
export const smallestStringWithAGivenNumericValue = (
	n: number,
	k: number,
): string => {
	const letters: string[] = new Array<string>(n);
	let rest = k;
	for (let i = n - 1; i >= 0; i--) {
		const value = Math.min(26, rest - i);
		letters[i] = String.fromCharCode(96 + value);
		rest -= value;
	}
	return letters.join("");
};
