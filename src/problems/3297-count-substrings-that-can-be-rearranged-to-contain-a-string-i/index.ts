/**
 * 3297. Count Substrings That Can Be Rearranged to Contain a String I
 *
 * Count the substrings of `word1` that have at least as many of each
 * letter as `word2`, so they can be rearranged to start with it.
 *
 * Slide a window, tracking how many letters still fall short. For each
 * start, extend the end until nothing is missing; every longer substring
 * from that start also works.
 *
 * @see https://leetcode.com/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-i/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubstringsThatCanBeRearrangedToContainAStringI("bcca", "abc"); // 1
 */
export const countSubstringsThatCanBeRearrangedToContainAStringI = (
	word1: string,
	word2: string,
): number => {
	const need = new Int32Array(26);
	let missing = 0;
	for (let i = 0; i < word2.length; i++) {
		const letter = word2.charCodeAt(i) - 97;
		if ((need[letter] ?? 0) === 0) missing++;
		need[letter] = (need[letter] ?? 0) + 1;
	}
	const n = word1.length;
	let total = 0;
	for (let left = 0, right = 0; left < n; left++) {
		while (right < n && missing > 0) {
			const letter = word1.charCodeAt(right++) - 97;
			need[letter] = (need[letter] ?? 0) - 1;
			if (need[letter] === 0) missing--;
		}
		if (missing === 0) total += n - right + 1;
		const letter = word1.charCodeAt(left) - 97;
		if (need[letter] === 0) missing++;
		need[letter] = (need[letter] ?? 0) + 1;
	}
	return total;
};
