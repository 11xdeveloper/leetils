/**
 * 4033. Valid K-Unique Subarrays I
 *
 * For each query `[l, r]`, whether `nums[l..r]` has exactly `k` distinct
 * values, each appearing an even number of times.
 *
 * Give every value a random 64-bit tag (two 32-bit halves): every count
 * is even exactly when the XOR of tags over the range is 0, a comparison
 * of prefix XORs. Count distinct values offline: sweep the right end,
 * keeping each value marked only at its latest position in a Fenwick
 * tree.
 *
 * @see https://leetcode.com/problems/valid-k-unique-subarrays-i/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n + q)
 *
 * @example
 * validKUniqueSubarraysI([1, 2, 2, 1], 2, [[0, 1], [0, 3], [1, 2]]); // [false, true, false]
 */
export const validKUniqueSubarraysI = (
	nums: readonly number[],
	k: number,
	queries: readonly (readonly number[])[],
): boolean[] => {
	const n = nums.length;
	const mix = (x: number, seed: number): number => {
		let h = Math.imul(x ^ seed, 0x9e3779b1);
		h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
		h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
		return (h ^ (h >>> 16)) >>> 0;
	};
	const low = new Uint32Array(n + 1);
	const high = new Uint32Array(n + 1);
	nums.forEach((x, i) => {
		low[i + 1] = ((low[i] ?? 0) ^ mix(x, 0x1234567)) >>> 0;
		high[i + 1] = ((high[i] ?? 0) ^ mix(x, 0x7654321)) >>> 0;
	});
	const tree = new Int32Array(n + 1);
	const update = (i: number, delta: number): void => {
		for (i++; i <= n; i += i & -i) tree[i] = (tree[i] ?? 0) + delta;
	};
	const prefix = (i: number): number => {
		let total = 0;
		for (; i > 0; i -= i & -i) total += tree[i] ?? 0;
		return total;
	};
	const order = queries
		.map((_, i) => i)
		.sort((a, b) => (queries[a]?.[1] ?? 0) - (queries[b]?.[1] ?? 0));
	const latest = new Map<number, number>();
	const answers = new Array<boolean>(queries.length).fill(false);
	let r = -1;
	for (const index of order) {
		const [l = 0, to = 0] = queries[index] ?? [];
		while (r < to) {
			const x = nums[++r] ?? 0;
			const previous = latest.get(x);
			if (previous !== undefined) update(previous, -1);
			update(r, 1);
			latest.set(x, r);
		}
		const evenCounts = low[to + 1] === low[l] && high[to + 1] === high[l];
		answers[index] = evenCounts && prefix(to + 1) - prefix(l) === k;
	}
	return answers;
};
