/**
 * 3962. Maximum Subarray Sum After at Most K Swaps
 *
 * After at most `k` swaps of any two elements, returns the largest
 * subarray sum.
 *
 * For a fixed window, swap its t smallest elements for the t largest
 * outside it while each pair improves the sum. The best t is where the
 * two sorted lists cross: with all values ranked, the crossing point only
 * depends on the window's length, so two Fenwick lookups give t (capped
 * at k), and descents give the sums of the t smallest inside and t
 * largest outside. Grow windows one element at a time from every start.
 *
 * @see https://leetcode.com/problems/maximum-subarray-sum-after-at-most-k-swaps/
 * @difficulty Hard
 * @timeComplexity O(n² log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSubarraySumAfterAtMostKSwaps([4, 3, 2, 4], 2); // 13
 */
export const maximumSubarraySumAfterAtMostKSwaps = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const rank = new Map(values.map((v, i) => [v, i + 1]));
	const d = values.length;
	let top = 1;
	while (top * 2 <= d) top *= 2;
	const build = (list: readonly number[]) => {
		const count = new Float64Array(d + 1);
		const sum = new Float64Array(d + 1);
		for (const x of list)
			for (let i = rank.get(x) ?? 1; i <= d; i += i & -i) {
				count[i] = (count[i] ?? 0) + 1;
				sum[i] = (sum[i] ?? 0) + x;
			}
		return { count, sum };
	};
	const all = build(nums);
	// below[c]: how many elements have rank at most c.
	const below = new Int32Array(d + 1);
	for (const x of nums)
		below[rank.get(x) ?? 1] = (below[rank.get(x) ?? 1] ?? 0) + 1;
	for (let c = 1; c <= d; c++) below[c] = (below[c] ?? 0) + (below[c - 1] ?? 0);
	const total = nums.reduce((a, b) => a + b, 0);
	const prefixCount = (tree: Float64Array, c: number): number => {
		let result = 0;
		for (let i = c; i > 0; i -= i & -i) result += tree[i] ?? 0;
		return result;
	};
	/** Sum of the t smallest of a multiset given by node-wise count and sum readers. */
	const smallestSum = (
		count: (i: number) => number,
		sum: (i: number) => number,
		t: number,
	): number => {
		let [position, taken, result] = [0, 0, 0];
		for (let step = top; step > 0; step >>= 1) {
			const next = position + step;
			if (next <= d && taken + count(next) < t) {
				position = next;
				taken += count(next);
				result += sum(next);
			}
		}
		return t > taken ? result + (t - taken) * (values[position] ?? 0) : result;
	};
	let best = Number.NEGATIVE_INFINITY;
	for (let l = 0; l < n; l++) {
		const inside = {
			count: new Float64Array(d + 1),
			sum: new Float64Array(d + 1),
		};
		let windowSum = 0;
		for (let r = l; r < n; r++) {
			const x = nums[r] ?? 0;
			windowSum += x;
			for (let i = rank.get(x) ?? 1; i <= d; i += i & -i) {
				inside.count[i] = (inside.count[i] ?? 0) + 1;
				inside.sum[i] = (inside.sum[i] ?? 0) + x;
			}
			const length = r - l + 1;
			const outsideCount = n - length;
			// Largest cut c with at most outsideCount elements ranked at or below it.
			let [lo, hi] = [0, d];
			while (lo < hi) {
				const mid = (lo + hi + 1) >>> 1;
				if ((below[mid] ?? 0) <= outsideCount) lo = mid;
				else hi = mid - 1;
			}
			let swaps = 0;
			for (const c of [lo, lo + 1]) {
				if (c > d) continue;
				// Inside values below value c (ranks < c) against outside values at least it.
				const insideBelow = prefixCount(inside.count, c - 1);
				const outsideAbove = outsideCount - ((below[c - 1] ?? 0) - insideBelow);
				swaps = Math.max(swaps, Math.min(insideBelow, outsideAbove));
			}
			swaps = Math.min(swaps, k);
			let gain = 0;
			if (swaps > 0) {
				const outCount = (i: number) =>
					(all.count[i] ?? 0) - (inside.count[i] ?? 0);
				const outSum = (i: number) => (all.sum[i] ?? 0) - (inside.sum[i] ?? 0);
				const outsideTotal = total - windowSum;
				const largestOutside =
					outsideTotal - smallestSum(outCount, outSum, outsideCount - swaps);
				const smallestInside = smallestSum(
					(i) => inside.count[i] ?? 0,
					(i) => inside.sum[i] ?? 0,
					swaps,
				);
				gain = largestOutside - smallestInside;
			}
			best = Math.max(best, windowSum + gain);
		}
	}
	return best;
};
