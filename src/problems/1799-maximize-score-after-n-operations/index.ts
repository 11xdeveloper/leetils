/**
 * 1799. Maximize Score After N Operations
 *
 * Operation `i` (1-indexed) removes two elements of `nums` (2n of them, up
 * to 14) and scores `i · gcd(x, y)`. Returns the largest total score.
 *
 * Bitmask dynamic programming over the removed elements: the operation
 * number is half the count removed so far.
 *
 * @see https://leetcode.com/problems/maximize-score-after-n-operations/
 * @difficulty Hard
 * @timeComplexity O(2^(2n) · n^2)
 * @spaceComplexity O(2^(2n) + n^2)
 *
 * @example
 * maximizeScoreAfterNOperations([3, 4, 6, 8]); // 11
 */
export const maximizeScoreAfterNOperations = (
	nums: readonly number[],
): number => {
	const m = nums.length;
	const gcd = (a: number, b: number) => {
		let [x, y] = [a, b];
		while (y > 0) [x, y] = [y, x % y];
		return x;
	};
	const pairGcd = nums.map((a) => nums.map((b) => gcd(a, b)));
	const best = new Array<number>(1 << m).fill(-1);
	best[0] = 0;
	for (let mask = 0; mask < 1 << m; mask++) {
		const current = best[mask] ?? -1;
		if (current < 0) continue;
		let removed = 0;
		for (let bit = mask; bit > 0; bit &= bit - 1) removed++;
		if (removed % 2 === 1) continue;
		const operation = removed / 2 + 1;
		for (let i = 0; i < m; i++) {
			if (mask & (1 << i)) continue;
			for (let j = i + 1; j < m; j++) {
				if (mask & (1 << j)) continue;
				const next = mask | (1 << i) | (1 << j);
				best[next] = Math.max(
					best[next] ?? -1,
					current + operation * (pairGcd[i]?.[j] ?? 0),
				);
			}
		}
	}
	return best[(1 << m) - 1] ?? 0;
};
