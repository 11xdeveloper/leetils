/**
 * 3806. Maximum Bitwise AND After Increment Operations
 *
 * With at most `k` increments in all, maximise the bitwise AND of some
 * `m` elements of `nums`.
 *
 * Build the answer greedily from the top bit. A candidate AND is possible
 * when the m cheapest elements can each be raised to a number containing
 * all its bits; the cheapest such number for x keeps x's higher bits, sets
 * the lowest 0 bit that allows the rest, and fills in the candidate below.
 *
 * @see https://leetcode.com/problems/maximum-bitwise-and-after-increment-operations/
 * @difficulty Hard
 * @timeComplexity O(n log n · log V)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumBitwiseAndAfterIncrementOperations([3, 1, 2], 8, 2); // 6
 */
export const maximumBitwiseAndAfterIncrementOperations = (
	nums: readonly number[],
	k: number,
	m: number,
): number => {
	/** The smallest y ≥ x containing every bit of `want`. */
	const raise = (x: number, want: number): number => {
		if ((x & want) === want) return x;
		let best = Number.POSITIVE_INFINITY;
		for (let bit = 30; bit >= 0; bit--) {
			const above = bit === 30 ? 0 : x & ~((1 << (bit + 1)) - 1);
			const wantAbove = bit === 30 ? 0 : want & ~((1 << (bit + 1)) - 1);
			if ((above & wantAbove) !== wantAbove) break;
			if (!((x >> bit) & 1))
				best = above + (1 << bit) + (want & ((1 << bit) - 1));
		}
		return best;
	};
	let answer = 0;
	for (let bit = 30; bit >= 0; bit--) {
		const candidate = answer | (1 << bit);
		const costs = nums
			.map((x) => raise(x, candidate) - x)
			.sort((a, b) => a - b);
		let total = 0;
		for (let i = 0; i < m; i++) total += costs[i] ?? 0;
		if (total <= k) answer = candidate;
	}
	return answer;
};
