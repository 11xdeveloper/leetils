/**
 * 2350. Shortest Impossible Sequence of Rolls
 *
 * Returns the length of the shortest sequence of values from 1 to `k`
 * that is not a subsequence of `rolls`.
 *
 * Split `rolls` greedily into consecutive blocks each containing every
 * value; with `b` complete blocks, every sequence of length `b` appears,
 * and some of length `b + 1` doesn't.
 *
 * @see https://leetcode.com/problems/shortest-impossible-sequence-of-rolls/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * shortestImpossibleSequenceOfRolls([4, 2, 1, 2, 3, 3, 2, 4, 1], 4); // 3
 */
export const shortestImpossibleSequenceOfRolls = (
	rolls: readonly number[],
	k: number,
): number => {
	let blocks = 0;
	let seen = new Set<number>();
	for (const roll of rolls) {
		seen.add(roll);
		if (seen.size < k) continue;
		blocks++;
		seen = new Set();
	}
	return blocks + 1;
};
