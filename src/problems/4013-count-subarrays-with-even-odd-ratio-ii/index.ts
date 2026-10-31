/**
 * 4013. Count Subarrays With Even Odd Ratio II
 *
 * Counts subarrays with at least one odd element whose evens-to-odds
 * ratio is at most a/b.
 *
 * Weigh each even element b and each odd one -a: a subarray qualifies
 * exactly when its weight is at most 0 (an all-even subarray weighs more,
 * so the odd requirement takes care of itself). Count earlier prefix
 * weights at least the current one with a Fenwick tree.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-even-odd-ratio-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubarraysWithEvenOddRatioII([2, 2, 1], 2, 1); // 3
 */
export const countSubarraysWithEvenOddRatioII = (
	nums: readonly number[],
	a: number,
	b: number,
): number => {
	const prefix = [0];
	for (const x of nums)
		prefix.push((prefix.at(-1) ?? 0) + (x % 2 === 0 ? b : -a));
	const values = [...new Set(prefix)].sort((x, y) => x - y);
	const rank = new Map(values.map((v, i) => [v, i + 1]));
	const m = values.length;
	const tree = new Int32Array(m + 1);
	let [count, seen] = [0, 0];
	for (const p of prefix) {
		const r = rank.get(p) ?? 1;
		// Earlier prefixes with value below p don't count.
		let below = 0;
		for (let i = r - 1; i > 0; i -= i & -i) below += tree[i] ?? 0;
		count += seen - below;
		for (let i = r; i <= m; i += i & -i) tree[i] = (tree[i] ?? 0) + 1;
		seen++;
	}
	return count;
};
