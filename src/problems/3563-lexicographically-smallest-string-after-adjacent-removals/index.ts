/**
 * 3563. Lexicographically Smallest String After Adjacent Removals
 *
 * Any number of times, remove a pair of neighbouring letters that are
 * consecutive in the alphabet (which wraps, so 'a' and 'z' count). Returns
 * the lexicographically smallest result.
 *
 * First find which substrings can vanish entirely: the first letter must
 * pair with some letter k inside, with everything between and after them
 * vanishing too. Then the best result from each position either deletes a
 * vanishing block or keeps the letter.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-string-after-adjacent-removals/
 * @difficulty Hard
 * @timeComplexity O(n³)
 * @spaceComplexity O(n²)
 *
 * @example
 * lexicographicallySmallestStringAfterAdjacentRemovals("abc"); // "a"
 */
export const lexicographicallySmallestStringAfterAdjacentRemovals = (
	s: string,
): string => {
	const n = s.length;
	const pairs = (i: number, j: number): boolean => {
		const gap = Math.abs(s.charCodeAt(i) - s.charCodeAt(j));
		return gap === 1 || gap === 25;
	};
	// vanish[i * (n + 1) + j]: s[i..j) can be removed entirely.
	const vanish = new Uint8Array((n + 1) * (n + 1));
	const empty = (i: number, j: number): boolean =>
		i >= j || vanish[i * (n + 1) + j] === 1;
	for (let i = 0; i <= n; i++) vanish[i * (n + 1) + i] = 1;
	for (let length = 2; length <= n; length += 2)
		for (let i = 0; i + length <= n; i++) {
			const j = i + length;
			for (let k = i + 1; k < j; k += 2)
				if (pairs(i, k) && empty(i + 1, k) && empty(k + 1, j)) {
					vanish[i * (n + 1) + j] = 1;
					break;
				}
		}
	const best: string[] = new Array<string>(n + 1).fill("");
	for (let i = n - 1; i >= 0; i--) {
		let result = s.charAt(i) + (best[i + 1] ?? "");
		for (let j = i + 2; j <= n; j += 2)
			if (empty(i, j)) {
				const candidate = best[j] ?? "";
				if (candidate < result) result = candidate;
			}
		best[i] = result;
	}
	return best[0] ?? "";
};
