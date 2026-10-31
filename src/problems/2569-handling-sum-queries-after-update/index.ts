/**
 * 2569. Handling Sum Queries After Update
 *
 * Queries come in three kinds: `[1, l, r]` flips the bits of `nums1` in
 * `[l, r]`; `[2, p, 0]` adds `nums1[i] · p` to each `nums2[i]`; and
 * `[3, 0, 0]` asks for the sum of `nums2`. Returns the answers.
 *
 * The second kind adds `p` times the number of 1s in `nums1`, so keep a
 * segment tree counting 1s with lazy range flips.
 *
 * @see https://leetcode.com/problems/handling-sum-queries-after-update/
 * @difficulty Hard
 * @timeComplexity O(n + q log n)
 * @spaceComplexity O(n)
 *
 * @example
 * handlingSumQueriesAfterUpdate([1, 0, 1], [0, 0, 0], [[1, 1, 1], [2, 1, 0], [3, 0, 0]]); // [3]
 */
export const handlingSumQueriesAfterUpdate = (
	nums1: readonly number[],
	nums2: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums1.length;
	const ones = new Int32Array(4 * n);
	const flipped = new Uint8Array(4 * n);
	const build = (node: number, low: number, high: number): void => {
		if (low === high) {
			ones[node] = nums1[low] ?? 0;
			return;
		}
		const mid = (low + high) >> 1;
		build(2 * node, low, mid);
		build(2 * node + 1, mid + 1, high);
		ones[node] = (ones[2 * node] ?? 0) + (ones[2 * node + 1] ?? 0);
	};
	const flip = (
		node: number,
		low: number,
		high: number,
		from: number,
		to: number,
	): void => {
		if (to < low || high < from) return;
		if (from <= low && high <= to) {
			ones[node] = high - low + 1 - (ones[node] ?? 0);
			flipped[node] = 1 - (flipped[node] ?? 0);
			return;
		}
		const mid = (low + high) >> 1;
		if (flipped[node]) {
			for (const [child, l, h] of [
				[2 * node, low, mid],
				[2 * node + 1, mid + 1, high],
			] as const) {
				ones[child] = h - l + 1 - (ones[child] ?? 0);
				flipped[child] = 1 - (flipped[child] ?? 0);
			}
			flipped[node] = 0;
		}
		flip(2 * node, low, mid, from, to);
		flip(2 * node + 1, mid + 1, high, from, to);
		ones[node] = (ones[2 * node] ?? 0) + (ones[2 * node + 1] ?? 0);
	};
	build(1, 0, n - 1);

	let sum = nums2.reduce((total, x) => total + x, 0);
	const answers: number[] = [];
	for (const [kind, a = 0, b = 0] of queries) {
		if (kind === 1) flip(1, 0, n - 1, a, b);
		else if (kind === 2) sum += a * (ones[1] ?? 0);
		else answers.push(sum);
	}
	return answers;
};
