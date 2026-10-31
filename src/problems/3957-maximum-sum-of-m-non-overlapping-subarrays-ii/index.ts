/**
 * 3957. Maximum Sum of M Non-Overlapping Subarrays II
 *
 * Choose between 1 and `m` non-overlapping subarrays, each of length `l`
 * to `r`, maximising their total. Returns that total.
 *
 * The best total for exactly k subarrays is concave in k, so use a
 * Lagrangian penalty (the "Aliens trick"): charge λ per subarray, solve
 * without a limit while preferring fewer subarrays on ties, and binary
 * search the smallest λ needing at most m. The unlimited problem is the
 * part I recurrence with one layer. If even λ = 0 picks nothing, every
 * subarray is negative and the best single one is the answer.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-m-non-overlapping-subarrays-ii/
 * @difficulty Hard
 * @timeComplexity O(n log(n · V))
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSumOfMNonOverlappingSubarraysII([1, 0, 3, 4], 2, 1, 2); // 8
 */
export const maximumSumOfMNonOverlappingSubarraysII = (
	nums: readonly number[],
	m: number,
	l: number,
	r: number,
): number => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	/** Best penalised total and its fewest subarrays. */
	const solve = (
		penalty: number,
		atLeastOne: boolean,
	): [value: number, count: number] => {
		const value = new Float64Array(n + 1);
		const count = new Int32Array(n + 1);
		if (atLeastOne) value.fill(Number.NEGATIVE_INFINITY);
		value[0] = atLeastOne ? Number.NEGATIVE_INFINITY : 0;
		// For the single-subarray case, a fresh start is allowed from anywhere.
		const base = (t: number) =>
			(atLeastOne ? 0 : (value[t] ?? 0)) - (prefix[t] ?? 0);
		const better = (a: number, b: number) =>
			base(a) > base(b) ||
			(base(a) === base(b) && (count[a] ?? 0) <= (count[b] ?? 0));
		const window: number[] = [];
		let head = 0;
		for (let i = 1; i <= n; i++) {
			const enter = i - l;
			if (enter >= 0) {
				while (window.length > head && better(enter, window.at(-1) ?? 0))
					window.pop();
				window.push(enter);
			}
			while (window.length > head && (window[head] ?? 0) < i - r) head++;
			[value[i], count[i]] = [value[i - 1] ?? 0, count[i - 1] ?? 0];
			const start = window[head];
			if (start === undefined) continue;
			const ending = base(start) + (prefix[i] ?? 0) - penalty;
			const endingCount = (atLeastOne ? 0 : (count[start] ?? 0)) + 1;
			if (
				ending > (value[i] ?? 0) ||
				(ending === value[i] && endingCount < (count[i] ?? 0))
			)
				[value[i], count[i]] = [ending, endingCount];
		}
		return [value[n] ?? 0, count[n] ?? 0];
	};
	const [free, used] = solve(0, false);
	if (used === 0) return solve(0, true)[0];
	if (used <= m) return free;
	let [lo, hi] = [0, 2 * 1e5 * n + 1];
	while (lo < hi) {
		const mid = lo + Math.floor((hi - lo) / 2);
		if ((solve(mid, false)[1] ?? 0) <= m) hi = mid;
		else lo = mid + 1;
	}
	return solve(lo, false)[0] + lo * m;
};
