/**
 * 2746. Decremental String Concatenation
 *
 * Joining two strings drops one character when the first ends with the
 * letter the second starts with. Building up from `words[0]`, each next
 * word is joined on either side. Returns the shortest final length.
 *
 * Only the current string's first and last letters matter, so DP over
 * those 26 × 26 pairs.
 *
 * @see https://leetcode.com/problems/decremental-string-concatenation/
 * @difficulty Medium
 * @timeComplexity O(26² · n)
 * @spaceComplexity O(26²)
 *
 * @example
 * decrementalStringConcatenation(["aa", "ab", "bc"]); // 4
 */
export const decrementalStringConcatenation = (
	words: readonly string[],
): number => {
	const index = (first: number, last: number): number => first * 26 + last;
	const ends = (word: string): [number, number] => [
		word.charCodeAt(0) - 97,
		word.charCodeAt(word.length - 1) - 97,
	];
	const [f0, l0] = ends(words[0] ?? "a");
	let best = Array.from({ length: 26 * 26 }, () => Number.POSITIVE_INFINITY);
	best[index(f0, l0)] = words[0]?.length ?? 0;
	for (const word of words.slice(1)) {
		const [wf, wl] = ends(word);
		const next = Array.from(
			{ length: 26 * 26 },
			() => Number.POSITIVE_INFINITY,
		);
		for (let first = 0; first < 26; first++)
			for (let last = 0; last < 26; last++) {
				const length = best[index(first, last)] ?? Number.POSITIVE_INFINITY;
				if (length === Number.POSITIVE_INFINITY) continue;
				const after = length + word.length - (last === wf ? 1 : 0);
				const before = length + word.length - (wl === first ? 1 : 0);
				next[index(first, wl)] = Math.min(next[index(first, wl)] ?? 0, after);
				next[index(wf, last)] = Math.min(next[index(wf, last)] ?? 0, before);
			}
		best = next;
	}
	return Math.min(...best);
};
