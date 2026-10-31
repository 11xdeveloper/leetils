/**
 * 3762. Minimum Operations to Equalize Subarrays
 *
 * One operation adds or subtracts `k` from an element. For each query
 * `[l, r]`, returns the fewest operations making `nums[l..r]` all equal,
 * or -1 if impossible.
 *
 * It's possible only when every element has the same remainder mod k;
 * then meet at the median, costing the total distance to it over k. A
 * persistent segment tree over the sorted values finds a range's median
 * and the sum of the values below it.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-equalize-subarrays/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n log n)
 *
 * @example
 * minimumOperationsToEqualizeSubarrays([1, 4, 7], 3, [[0, 1], [0, 2]]); // [1, 2]
 */
export const minimumOperationsToEqualizeSubarrays = (
	nums: readonly number[],
	k: number,
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	// breaks[i]: positions j ≤ i whose remainder differs from the one before.
	const breaks = new Int32Array(n);
	for (let i = 1; i < n; i++)
		breaks[i] =
			(breaks[i - 1] ?? 0) +
			((((nums[i] ?? 0) % k) + k) % k !== (((nums[i - 1] ?? 0) % k) + k) % k
				? 1
				: 0);
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const rank = new Map(values.map((v, i) => [v, i]));
	const m = values.length;
	const capacity = (n + 1) * (2 + Math.ceil(Math.log2(m + 1)) + 1);
	const left = new Int32Array(capacity);
	const right = new Int32Array(capacity);
	const count = new Int32Array(capacity);
	const sum = new Float64Array(capacity);
	let nodes = 1;
	const insert = (
		previous: number,
		lo: number,
		hi: number,
		at: number,
		value: number,
	): number => {
		const node = nodes++;
		left[node] = left[previous] ?? 0;
		right[node] = right[previous] ?? 0;
		count[node] = (count[previous] ?? 0) + 1;
		sum[node] = (sum[previous] ?? 0) + value;
		if (hi - lo > 1) {
			const mid = (lo + hi) >>> 1;
			if (at < mid)
				left[node] = insert(left[previous] ?? 0, lo, mid, at, value);
			else right[node] = insert(right[previous] ?? 0, mid, hi, at, value);
		}
		return node;
	};
	const roots = [0];
	nums.forEach((num, i) => {
		roots.push(insert(roots[i] ?? 0, 0, m, rank.get(num) ?? 0, num));
	});
	/** The t-th smallest (from 1) in the range, with the sum of the smallest t. */
	const smallest = (
		a: number,
		b: number,
		t: number,
	): [value: number, total: number] => {
		let [lo, hi] = [0, m];
		let total = 0;
		while (hi - lo > 1) {
			const mid = (lo + hi) >>> 1;
			const leftCount = (count[left[b] ?? 0] ?? 0) - (count[left[a] ?? 0] ?? 0);
			if (t <= leftCount) {
				[a, b, hi] = [left[a] ?? 0, left[b] ?? 0, mid];
			} else {
				total += (sum[left[b] ?? 0] ?? 0) - (sum[left[a] ?? 0] ?? 0);
				t -= leftCount;
				[a, b, lo] = [right[a] ?? 0, right[b] ?? 0, mid];
			}
		}
		return [values[lo] ?? 0, total + t * (values[lo] ?? 0)];
	};
	return queries.map(([l = 0, r = 0]) => {
		if ((breaks[r] ?? 0) !== (breaks[l] ?? 0)) return -1;
		const [a, b] = [roots[l] ?? 0, roots[r + 1] ?? 0];
		const size = r - l + 1;
		const half = Math.floor((size + 1) / 2);
		const [median, lower] = smallest(a, b, half);
		const all = (sum[b] ?? 0) - (sum[a] ?? 0);
		const distance =
			median * half - lower + (all - lower) - median * (size - half);
		return distance / k;
	});
};
