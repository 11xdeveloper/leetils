/**
 * 3329. Count Substrings With K-Frequency Characters II
 *
 * Count the substrings of `s` in which some letter appears at least `k`
 * times.
 *
 * For each end, the newest letter is the only one whose count changed, so
 * while it has at least `k` copies, the window and every extension of it
 * to the right qualify for the current start: count them and move the
 * start on.
 *
 * @see https://leetcode.com/problems/count-substrings-with-k-frequency-characters-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubstringsWithKFrequencyCharactersII("abacb", 2); // 4
 */
export const countSubstringsWithKFrequencyCharactersII = (
	s: string,
	k: number,
): number => {
	const n = s.length;
	const counts = new Int32Array(26);
	let total = 0;
	for (let left = 0, right = 0; right < n; right++) {
		const letter = s.charCodeAt(right) - 97;
		counts[letter] = (counts[letter] ?? 0) + 1;
		while ((counts[letter] ?? 0) >= k) {
			total += n - right;
			const dropped = s.charCodeAt(left++) - 97;
			counts[dropped] = (counts[dropped] ?? 0) - 1;
		}
	}
	return total;
};
