/**
 * 471. Encode String with Shortest Length
 *
 * Encodes `s` as briefly as possible, where `k[t]` stands for `t` repeated
 * `k` times and encodings can nest. Parts that encoding wouldn't shorten are
 * left as they are. Any shortest encoding is acceptable.
 *
 * Interval DP over substrings, shortest first. A substring's best encoding
 * is the shortest of: itself; the best encodings of two halves split at any
 * point; and, if it's a smaller unit repeated, `k[unit's encoding]`. The
 * shortest repeating unit of `t` is found by where `t` next appears in
 * `t + t` (after position 0).
 *
 * @see https://leetcode.com/problems/encode-string-with-shortest-length/
 * @difficulty Hard
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * encodeStringWithShortestLength("abbbabbbcabbbabbbc"); // "2[2[abbb]c]"
 */
export const encodeStringWithShortestLength = (s: string): string => {
	const n = s.length;
	// best[i][j] is the shortest encoding of s.slice(i, j + 1).
	const best: string[][] = Array.from({ length: n }, () =>
		new Array<string>(n).fill(""),
	);

	for (let length = 1; length <= n; length++) {
		for (let i = 0; i + length <= n; i++) {
			const j = i + length - 1;
			const text = s.slice(i, j + 1);
			let shortest = text;

			if (length >= 5) {
				for (let k = i; k < j; k++) {
					const split = (best[i]?.[k] ?? "") + (best[k + 1]?.[j] ?? "");
					if (split.length < shortest.length) shortest = split;
				}

				const unit = (text + text).indexOf(text, 1);
				if (unit < length) {
					const repeated = `${length / unit}[${best[i]?.[i + unit - 1] ?? ""}]`;
					if (repeated.length < shortest.length) shortest = repeated;
				}
			}

			const row = best[i];
			if (row) row[j] = shortest;
		}
	}

	return best[0]?.[n - 1] ?? "";
};
