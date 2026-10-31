/**
 * 4032. Longest Subarray With at Most K Distinct Prime Factors
 *
 * The longest subarray whose elements together have at most `k` distinct
 * prime factors.
 *
 * Sliding window, counting how many elements in it carry each prime.
 *
 * @see https://leetcode.com/problems/longest-subarray-with-at-most-k-distinct-prime-factors/
 * @difficulty Medium
 * @timeComplexity O(n log V + V log log V)
 * @spaceComplexity O(n + V)
 *
 * @example
 * longestSubarrayWithAtMostKDistinctPrimeFactors([7, 6, 10, 12, 11], 3); // 3
 */
export const longestSubarrayWithAtMostKDistinctPrimeFactors = (
	nums: readonly number[],
	k: number,
): number => {
	const limit = Math.max(...nums);
	const smallest = new Int32Array(limit + 1);
	for (let p = 2; p <= limit; p++)
		if (!smallest[p])
			for (let x = p; x <= limit; x += p) if (!smallest[x]) smallest[x] = p;
	const primes = nums.map((num) => {
		const list: number[] = [];
		for (let x = num; x > 1; ) {
			const p = smallest[x] ?? x;
			list.push(p);
			while (x % p === 0) x /= p;
		}
		return list;
	});
	const counts = new Map<number, number>();
	let [start, best] = [0, 0];
	primes.forEach((list, end) => {
		for (const p of list) counts.set(p, (counts.get(p) ?? 0) + 1);
		while (counts.size > k) {
			for (const p of primes[start++] ?? []) {
				const left = (counts.get(p) ?? 0) - 1;
				if (left === 0) counts.delete(p);
				else counts.set(p, left);
			}
		}
		best = Math.max(best, end - start + 1);
	});
	return best;
};
