/**
 * 526. Beautiful Arrangement
 *
 * Counts the permutations `perm` of 1 to `n` where, for every position `i`
 * (from 1), `perm[i]` divides `i` or `i` divides `perm[i]`.
 *
 * DP over the set of numbers used so far, as a bitmask. The next position
 * is the number of bits set, so the mask alone is the state; each mask adds
 * its count to every mask with one more number that fits the next
 * position.
 *
 * @see https://leetcode.com/problems/beautiful-arrangement/
 * @difficulty Medium
 * @timeComplexity O(2^n · n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * beautifulArrangement(2); // 2: [1, 2] and [2, 1]
 */
export const beautifulArrangement = (n: number): number => {
	const ways = new Array<number>(1 << n).fill(0);
	ways[0] = 1;

	for (let mask = 0; mask < 1 << n; mask++) {
		const count = ways[mask] ?? 0;
		if (count === 0) continue;
		let position = 1;
		for (let bits = mask; bits; bits &= bits - 1) position++;

		for (let num = 1; num <= n; num++) {
			const bit = 1 << (num - 1);
			if (!(mask & bit) && (num % position === 0 || position % num === 0)) {
				ways[mask | bit] = (ways[mask | bit] ?? 0) + count;
			}
		}
	}

	return ways[(1 << n) - 1] ?? 0;
};
