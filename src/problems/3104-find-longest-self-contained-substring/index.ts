/**
 * 3104. Find Longest Self-Contained Substring
 *
 * The length of the longest substring other than `s` itself whose letters
 * appear nowhere outside it, or -1 if there's none.
 *
 * Such a substring starts at some letter's first occurrence. From each of
 * those (at most 26) starts, extend right, stopping if a letter appeared
 * before the start, and pushing the required end out to each letter's last
 * occurrence. Every point where the scan reaches the required end closes a
 * self-contained substring.
 *
 * @see https://leetcode.com/problems/find-longest-self-contained-substring/
 * @difficulty Hard
 * @timeComplexity O(26 n)
 * @spaceComplexity O(1)
 *
 * @example
 * findLongestSelfContainedSubstring("abba"); // 2
 */
export const findLongestSelfContainedSubstring = (s: string): number => {
	const n = s.length;
	const first = new Array<number>(26).fill(-1);
	const last = new Array<number>(26).fill(-1);
	for (let i = 0; i < n; i++) {
		const letter = s.charCodeAt(i) - 97;
		if (first[letter] === -1) first[letter] = i;
		last[letter] = i;
	}
	let best = -1;
	for (const start of first) {
		if (start === -1) continue;
		let end = 0;
		for (let j = start; j < n; j++) {
			const letter = s.charCodeAt(j) - 97;
			if ((first[letter] ?? 0) < start) break;
			end = Math.max(end, last[letter] ?? 0);
			if (j === end && j - start + 1 < n) best = Math.max(best, j - start + 1);
		}
	}
	return best;
};
