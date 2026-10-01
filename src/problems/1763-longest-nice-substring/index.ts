/**
 * 1763. Longest Nice Substring
 *
 * A string is nice if every letter in it appears in both cases. Returns
 * the longest nice substring of `s`, the earliest on ties, or "".
 *
 * Divide and conquer: a character whose other case is missing can't be in
 * any nice substring, so split around it and recurse on the pieces (with
 * an explicit stack).
 *
 * @see https://leetcode.com/problems/longest-nice-substring/
 * @difficulty Easy
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestNiceSubstring("YazaAay"); // "aAa"
 */
export const longestNiceSubstring = (s: string): string => {
	let best: [start: number, end: number] = [0, 0];
	const stack: [start: number, end: number][] = [[0, s.length]];
	for (let range = stack.pop(); range; range = stack.pop()) {
		const [start, end] = range;
		if (end - start <= best[1] - best[0] || end - start < 2) continue;
		const present = new Set(s.slice(start, end));
		let split = -1;
		for (let i = start; i < end; i++) {
			const char = s[i] ?? "";
			if (
				!present.has(char.toLowerCase()) ||
				!present.has(char.toUpperCase())
			) {
				split = i;
				break;
			}
		}
		if (split === -1) {
			if (
				end - start > best[1] - best[0] ||
				(end - start === best[1] - best[0] && start < best[0])
			)
				best = [start, end];
			continue;
		}
		// Push the right piece first so the left one, which wins ties, is taken first.
		stack.push([split + 1, end], [start, split]);
	}
	return s.slice(best[0], best[1]);
};
