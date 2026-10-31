/**
 * 4064. Longest Subarray Divisible by K with At Most One Negation II
 *
 * The longest subarray whose sum is divisible by `k` (at most 3000),
 * possibly after negating one of its elements, or 0.
 *
 * With prefix sums P, subarray [L, R) qualifies when P[R] - P[L] is 0
 * mod k, or equals 2x mod k for some element x in it. For each residue of
 * P, the first and last occurrences give the longest candidates. For each
 * value t of 2x mod k, sweep residues c by first occurrence L with a
 * pointer into the positions having that t: pairing with the last
 * occurrence R of c + t works when such a position lies in [L, R).
 *
 * @see https://leetcode.com/problems/longest-subarray-divisible-by-k-with-at-most-one-negation-ii/
 * @difficulty Hard
 * @timeComplexity O(n + k · min(n, k))
 * @spaceComplexity O(n + k)
 *
 * @example
 * longestSubarrayDivisibleByKWithAtMostOneNegationII([4, 1, 2], 3); // 3
 */
export const longestSubarrayDivisibleByKWithAtMostOneNegationII = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const mod = (x: number) => ((x % k) + k) % k;
	const first = new Int32Array(k).fill(-1);
	const last = new Int32Array(k).fill(-1);
	let prefix = 0;
	for (let i = 0; i <= n; i++) {
		if (i > 0) prefix = mod(prefix + (nums[i - 1] ?? 0));
		if (first[prefix] === -1) first[prefix] = i;
		last[prefix] = i;
	}
	let best = 0;
	for (let c = 0; c < k; c++)
		if ((first[c] ?? -1) >= 0)
			best = Math.max(best, (last[c] ?? 0) - (first[c] ?? 0));
	const byDouble = new Map<number, number[]>();
	nums.forEach((x, m) => {
		const t = mod(2 * x);
		const list = byDouble.get(t) ?? [];
		list.push(m);
		byDouble.set(t, list);
	});
	const starts = Array.from({ length: k }, (_, c) => c)
		.filter((c) => (first[c] ?? -1) >= 0)
		.sort((a, b) => (first[a] ?? 0) - (first[b] ?? 0));
	for (const [t, positions] of byDouble) {
		let at = 0;
		for (const c of starts) {
			const L = first[c] ?? 0;
			while (at < positions.length && (positions[at] ?? 0) < L) at++;
			if (at === positions.length) break;
			const R = last[(c + t) % k] ?? -1;
			if (R > (positions[at] ?? 0)) best = Math.max(best, R - L);
		}
	}
	return best;
};
