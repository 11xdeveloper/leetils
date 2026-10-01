/**
 * 1520. Maximum Number of Non-Overlapping Substrings
 *
 * Returns the most non-overlapping substrings of `s` such that each holds
 * every occurrence of each of its letters, choosing the smallest total
 * length among such sets. Order doesn't matter.
 *
 * Every candidate is the smallest valid substring starting at some letter's
 * first occurrence: stretch it to cover all occurrences of each letter
 * inside, and drop it if that would need to stretch left. Candidates either
 * nest or don't overlap, so taking them greedily by end position picks the
 * innermost ones and the most of them.
 *
 * @see https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/
 * @difficulty Hard
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfNonOverlappingSubstrings("abbaccd"); // ["bb", "cc", "d"]
 */
export const maximumNumberOfNonOverlappingSubstrings = (
	s: string,
): string[] => {
	const first = new Array<number>(26).fill(Infinity);
	const last = new Array<number>(26).fill(-1);
	for (let i = 0; i < s.length; i++) {
		const letter = s.charCodeAt(i) - 97;
		first[letter] = Math.min(first[letter] ?? Infinity, i);
		last[letter] = i;
	}
	const candidates: [number, number][] = [];
	for (let letter = 0; letter < 26; letter++) {
		const start = first[letter] ?? Infinity;
		if (start === Infinity) continue;
		let end = last[letter] ?? 0;
		let valid = true;
		for (let i = start; i <= end && valid; i++) {
			const inner = s.charCodeAt(i) - 97;
			if ((first[inner] ?? 0) < start) valid = false;
			end = Math.max(end, last[inner] ?? 0);
		}
		if (valid) candidates.push([start, end]);
	}
	candidates.sort((a, b) => a[1] - b[1]);
	const chosen: string[] = [];
	let lastEnd = -1;
	for (const [start, end] of candidates) {
		if (start <= lastEnd) continue;
		chosen.push(s.slice(start, end + 1));
		lastEnd = end;
	}
	return chosen;
};
