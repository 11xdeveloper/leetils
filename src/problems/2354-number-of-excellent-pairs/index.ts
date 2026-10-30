/**
 * 2354. Number of Excellent Pairs
 *
 * A pair `(a, b)` of values from `nums` (order matters, `a = b` allowed)
 * is excellent when the set bits of `a OR b` and `a AND b` total at least
 * `k`. Counts the distinct excellent pairs.
 *
 * Those bits total `bits(a) + bits(b)`, so count the distinct values by
 * popcount and pair up the counts.
 *
 * @see https://leetcode.com/problems/number-of-excellent-pairs/
 * @difficulty Hard
 * @timeComplexity O(n + 31^2)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfExcellentPairs([1, 2, 3, 1], 3); // 5
 */
export const numberOfExcellentPairs = (
	nums: readonly number[],
	k: number,
): number => {
	const byBits = new Array<number>(32).fill(0);
	for (const num of new Set(nums)) {
		let bits = 0;
		for (let rest = num; rest; rest &= rest - 1) bits++;
		byBits[bits] = (byBits[bits] ?? 0) + 1;
	}
	let pairs = 0;
	for (const [a, countA] of byBits.entries())
		for (const [b, countB] of byBits.entries())
			if (a + b >= k) pairs += countA * countB;
	return pairs;
};
