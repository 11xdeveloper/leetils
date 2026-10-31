/**
 * 3399. Smallest Substring With Identical Characters II
 *
 * Flip at most `numOps` bits of the binary string `s` to make its longest
 * run of equal bits as short as possible. Returns that length.
 *
 * Binary search on the length L. For L = 1 the string must alternate, so
 * compare against both alternating patterns. Otherwise a run of r needs
 * ⌊r / (L + 1)⌋ flips to break it into pieces of at most L.
 *
 * @see https://leetcode.com/problems/smallest-substring-with-identical-characters-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestSubstringWithIdenticalCharactersII("000001", 1); // 2
 */
export const smallestSubstringWithIdenticalCharactersII = (
	s: string,
	numOps: number,
): number => {
	const n = s.length;
	const runs: number[] = [];
	for (let i = 0; i < n; ) {
		let j = i;
		while (j < n && s[j] === s[i]) j++;
		runs.push(j - i);
		i = j;
	}
	let mismatched = 0;
	for (let i = 0; i < n; i++) if (Number(s[i]) !== i % 2) mismatched++;
	if (Math.min(mismatched, n - mismatched) <= numOps) return 1;
	let lo = 2;
	let hi = n;
	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		let flips = 0;
		for (const run of runs) flips += Math.floor(run / (mid + 1));
		if (flips <= numOps) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
