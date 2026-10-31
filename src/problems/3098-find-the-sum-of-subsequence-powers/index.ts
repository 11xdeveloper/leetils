const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3098. Find the Sum of Subsequence Powers
 *
 * A subsequence's power is the smallest difference between two of its
 * elements. Returns the total power of all subsequences of length `k`,
 * modulo 10⁹ + 7.
 *
 * For a threshold d, count the length-k subsequences whose sorted
 * neighbours are all at least d apart, using dynamic programming over the
 * sorted array with prefix sums. A subsequence with power p is counted for
 * every threshold up to p, so summing the counts weighted by the gap to the
 * previous candidate threshold (the distinct pairwise differences) gives
 * the total.
 *
 * @see https://leetcode.com/problems/find-the-sum-of-subsequence-powers/
 * @difficulty Hard
 * @timeComplexity O(n³ · k)
 * @spaceComplexity O(n² + n · k)
 *
 * @example
 * findTheSumOfSubsequencePowers([1, 2, 3, 4], 3); // 4
 */
export const findTheSumOfSubsequencePowers = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const n = sorted.length;
	const gaps = new Set<number>();
	for (let i = 0; i < n; i++)
		for (let j = i + 1; j < n; j++)
			gaps.add((sorted[j] ?? 0) - (sorted[i] ?? 0));
	/** Length-k subsequences with all sorted neighbours at least `d` apart. */
	const spaced = (d: number): number => {
		// prefix[j][i]: subsequences of length j ending at or before i.
		const prefix = Array.from({ length: k + 1 }, () =>
			new Array<number>(n + 1).fill(0),
		);
		const first = prefix[1];
		if (first) for (let i = 0; i < n; i++) first[i + 1] = i + 1;
		let reach = 0;
		const ends = new Array<number>(n).fill(0);
		for (let i = 0; i < n; i++) {
			while (reach < i && (sorted[i] ?? 0) - (sorted[reach] ?? 0) >= d) reach++;
			ends[i] = reach;
		}
		for (let j = 2; j <= k; j++) {
			const row = prefix[j];
			const previous = prefix[j - 1];
			if (!row || !previous) continue;
			for (let i = 0; i < n; i++)
				row[i + 1] = ((row[i] ?? 0) + (previous[ends[i] ?? 0] ?? 0)) % MOD;
		}
		return prefix[k]?.[n] ?? 0;
	};
	let total = 0;
	let previous = 0;
	for (const gap of [...gaps].sort((a, b) => a - b)) {
		total = (total + multiply((gap - previous) % MOD, spaced(gap))) % MOD;
		previous = gap;
	}
	return total;
};
