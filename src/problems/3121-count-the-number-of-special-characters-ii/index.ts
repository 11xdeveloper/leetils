/**
 * 3121. Count the Number of Special Characters II
 *
 * How many letters appear in `word` in both cases, with every lowercase
 * copy before the first uppercase one.
 *
 * Record each letter's last lowercase and first uppercase position.
 *
 * @see https://leetcode.com/problems/count-the-number-of-special-characters-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countTheNumberOfSpecialCharactersII("aaAbcBC"); // 3
 */
export const countTheNumberOfSpecialCharactersII = (word: string): number => {
	const lastLower = new Array<number>(26).fill(-1);
	const firstUpper = new Array<number>(26).fill(-1);
	for (let i = 0; i < word.length; i++) {
		const code = word.charCodeAt(i);
		if (code >= 97) lastLower[code - 97] = i;
		else if (firstUpper[code - 65] === -1) firstUpper[code - 65] = i;
	}
	let count = 0;
	for (let letter = 0; letter < 26; letter++) {
		const lower = lastLower[letter] ?? -1;
		const upper = firstUpper[letter] ?? -1;
		if (lower !== -1 && upper !== -1 && lower < upper) count++;
	}
	return count;
};
