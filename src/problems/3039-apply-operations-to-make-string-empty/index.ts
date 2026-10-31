/**
 * 3039. Apply Operations to Make String Empty
 *
 * Repeatedly remove the first occurrence of every letter of the alphabet
 * from `s`. Returns the string just before the last round, which empties
 * it.
 *
 * The last round removes the final copy of each letter with the highest
 * frequency, so the answer is those letters in the order of their last
 * occurrences.
 *
 * @see https://leetcode.com/problems/apply-operations-to-make-string-empty/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * applyOperationsToMakeStringEmpty("aabcbbca"); // "ba"
 */
export const applyOperationsToMakeStringEmpty = (s: string): string => {
	const counts = new Array<number>(26).fill(0);
	const last = new Array<number>(26).fill(-1);
	for (let i = 0; i < s.length; i++) {
		const letter = s.charCodeAt(i) - 97;
		counts[letter] = (counts[letter] ?? 0) + 1;
		last[letter] = i;
	}
	const max = Math.max(...counts);
	return last
		.map((index, letter) => [index, letter] as const)
		.filter(([, letter]) => counts[letter] === max)
		.sort((a, b) => a[0] - b[0])
		.map(([, letter]) => String.fromCharCode(97 + letter))
		.join("");
};
