/** Every index where `pattern` starts in `text` (every index for an empty pattern). */
const occurrences = (text: string, pattern: string): number[] => {
	const m = pattern.length;
	if (m === 0) return Array.from({ length: text.length + 1 }, (_, i) => i);
	const fail = new Int32Array(m);
	for (let i = 1, length = 0; i < m; i++) {
		while (length > 0 && pattern[i] !== pattern[length])
			length = fail[length - 1] ?? 0;
		if (pattern[i] === pattern[length]) length++;
		fail[i] = length;
	}
	const result: number[] = [];
	for (let i = 0, matched = 0; i < text.length; i++) {
		while (matched > 0 && text[i] !== pattern[matched])
			matched = fail[matched - 1] ?? 0;
		if (text[i] === pattern[matched]) matched++;
		if (matched === m) {
			result.push(i - m + 1);
			matched = fail[matched - 1] ?? 0;
		}
	}
	return result;
};

/**
 * 3455. Shortest Matching Substring
 *
 * The length of the shortest substring of `s` matching `p`, which has
 * exactly two `*`s standing for any run of characters, or -1.
 *
 * Split `p` into the parts a, b and c around the stars and find each part's
 * occurrences with KMP. For each occurrence of b, the best a is the latest
 * that ends by b's start and the best c the earliest that starts after b
 * ends; pointers sweeping both lists find them.
 *
 * @see https://leetcode.com/problems/shortest-matching-substring/
 * @difficulty Hard
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * shortestMatchingSubstring("abaacbaecebce", "ba*c*ce"); // 8
 */
export const shortestMatchingSubstring = (s: string, p: string): number => {
	const [a = "", b = "", c = ""] = p.split("*");
	const as = occurrences(s, a);
	const bs = occurrences(s, b);
	const cs = occurrences(s, c);
	let best = Number.POSITIVE_INFINITY;
	let ai = -1;
	let ci = 0;
	for (const start of bs) {
		while (ai + 1 < as.length && (as[ai + 1] ?? 0) + a.length <= start) ai++;
		while (ci < cs.length && (cs[ci] ?? 0) < start + b.length) ci++;
		if (ai < 0 || ci >= cs.length) continue;
		best = Math.min(best, (cs[ci] ?? 0) + c.length - (as[ai] ?? 0));
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
