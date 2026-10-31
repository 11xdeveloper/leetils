const VOWELS = "aeiou";

/**
 * 3306. Count of Substrings Containing Every Vowel and K Consonants II
 *
 * Count the substrings of `word` that contain every vowel at least once and
 * exactly `k` consonants.
 *
 * Count substrings with every vowel and at least `k` consonants, minus
 * those with at least `k + 1`. For "at least", slide a window: for each
 * start, find the first end where the window has every vowel and enough
 * consonants; every longer end works too.
 *
 * @see https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countOfSubstringsContainingEveryVowelAndKConsonantsII("ieaouqqieaouqq", 1); // 3
 */
export const countOfSubstringsContainingEveryVowelAndKConsonantsII = (
	word: string,
	k: number,
): number => {
	const n = word.length;
	const atLeast = (consonantsNeeded: number): number => {
		const vowels = new Int32Array(5);
		let distinct = 0;
		let consonants = 0;
		const bump = (v: number, delta: number): number => {
			const count = (vowels[v] ?? 0) + delta;
			vowels[v] = count;
			return count;
		};
		let total = 0;
		for (let left = 0, right = 0; left < n; left++) {
			while (right < n && (distinct < 5 || consonants < consonantsNeeded)) {
				const v = VOWELS.indexOf(word.charAt(right++));
				if (v === -1) consonants++;
				else if (bump(v, 1) === 1) distinct++;
			}
			if (distinct === 5 && consonants >= consonantsNeeded)
				total += n - right + 1;
			const v = VOWELS.indexOf(word.charAt(left));
			if (v === -1) consonants--;
			else if (bump(v, -1) === 0) distinct--;
		}
		return total;
	};
	return atLeast(k) - atLeast(k + 1);
};
