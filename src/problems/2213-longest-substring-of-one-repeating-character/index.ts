/**
 * 2213. Longest Substring of One Repeating Character
 *
 * Applies updates `s[queryIndices[i]] = queryCharacters[i]` in turn,
 * returning after each the length of the longest run of one character.
 *
 * A segment tree stores, per range, its longest run and the runs touching
 * each end; two halves combine by joining runs across the middle when the
 * characters there match.
 *
 * @see https://leetcode.com/problems/longest-substring-of-one-repeating-character/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestSubstringOfOneRepeatingCharacter("babacc", "bcb", [1, 3, 3]); // [3, 3, 4]
 */
export const longestSubstringOfOneRepeatingCharacter = (
	s: string,
	queryCharacters: string,
	queryIndices: readonly number[],
): number[] => {
	const n = s.length;
	const chars = [...s];
	const prefix = new Int32Array(4 * n);
	const suffix = new Int32Array(4 * n);
	const best = new Int32Array(4 * n);

	const pull = (node: number, lo: number, mid: number, hi: number): void => {
		const [left, right] = [2 * node, 2 * node + 1];
		const joins = chars[mid] === chars[mid + 1];
		const [leftLength, rightLength] = [mid - lo + 1, hi - mid];
		const leftPrefix = prefix[left] ?? 0;
		const rightSuffix = suffix[right] ?? 0;
		prefix[node] =
			joins && leftPrefix === leftLength
				? leftLength + (prefix[right] ?? 0)
				: leftPrefix;
		suffix[node] =
			joins && rightSuffix === rightLength
				? rightLength + (suffix[left] ?? 0)
				: rightSuffix;
		best[node] = Math.max(
			best[left] ?? 0,
			best[right] ?? 0,
			joins ? (suffix[left] ?? 0) + (prefix[right] ?? 0) : 0,
		);
	};
	const build = (node: number, lo: number, hi: number): void => {
		if (lo === hi) {
			prefix[node] = suffix[node] = best[node] = 1;
			return;
		}
		const mid = (lo + hi) >> 1;
		build(2 * node, lo, mid);
		build(2 * node + 1, mid + 1, hi);
		pull(node, lo, mid, hi);
	};
	const update = (
		node: number,
		lo: number,
		hi: number,
		index: number,
	): void => {
		if (lo === hi) return;
		const mid = (lo + hi) >> 1;
		if (index <= mid) update(2 * node, lo, mid, index);
		else update(2 * node + 1, mid + 1, hi, index);
		pull(node, lo, mid, hi);
	};

	build(1, 0, n - 1);
	return queryIndices.map((index, i) => {
		chars[index] = queryCharacters[i] ?? "";
		update(1, 0, n - 1, index);
		return best[1] ?? 0;
	});
};
