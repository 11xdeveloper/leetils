/**
 * 2382. Maximum Segment Sum After Removals
 *
 * Removes the elements at `removeQueries` one by one. Returns, after each
 * removal, the largest sum of a remaining contiguous segment.
 *
 * Run the removals backwards as insertions, joining each restored element
 * with restored neighbours through union-find; the best sum only grows.
 *
 * @see https://leetcode.com/problems/maximum-segment-sum-after-removals/
 * @difficulty Hard
 * @timeComplexity O(n · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSegmentSumAfterRemovals([1, 2, 5, 6, 1], [0, 3, 2, 4, 1]); // [14, 7, 2, 2, 0]
 */
export const maximumSegmentSumAfterRemovals = (
	nums: readonly number[],
	removeQueries: readonly number[],
): number[] => {
	const n = nums.length;
	const parent = Array.from({ length: n }, (_, i) => i);
	const sum = new Array<number>(n).fill(0);
	const restored = new Uint8Array(n);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		while (parent[x] !== root) [parent[x], x] = [root, parent[x] ?? root];
		return root;
	};
	const answer = new Array<number>(n).fill(0);
	let best = 0;
	for (let q = n - 1; q > 0; q--) {
		const i = removeQueries[q] ?? 0;
		restored[i] = 1;
		sum[i] = nums[i] ?? 0;
		for (const neighbour of [i - 1, i + 1]) {
			if (!restored[neighbour]) continue;
			const [a, b] = [find(i), find(neighbour)];
			parent[b] = a;
			sum[a] = (sum[a] ?? 0) + (sum[b] ?? 0);
		}
		best = Math.max(best, sum[find(i)] ?? 0);
		answer[q - 1] = best;
	}
	return answer;
};
