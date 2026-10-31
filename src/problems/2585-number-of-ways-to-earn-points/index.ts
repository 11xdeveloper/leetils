const MOD = 1_000_000_007;

/**
 * 2585. Number of Ways to Earn Points
 *
 * An exam has `count` questions of each type, each worth `marks` points;
 * questions of a type are indistinguishable. Returns the number of ways
 * to score exactly `target`, modulo 1e9 + 7.
 *
 * Bounded knapsack: for each type, a score can add up to `count` of its
 * questions to a smaller score.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-earn-points/
 * @difficulty Hard
 * @timeComplexity O(target · total count)
 * @spaceComplexity O(target)
 *
 * @example
 * numberOfWaysToEarnPoints(6, [[6, 1], [3, 2], [2, 3]]); // 7
 */
export const numberOfWaysToEarnPoints = (
	target: number,
	types: readonly (readonly number[])[],
): number => {
	let ways: number[] = Array.from({ length: target + 1 }, (_, score) =>
		score === 0 ? 1 : 0,
	);
	for (const [count = 0, marks = 1] of types) {
		const next = [...ways];
		for (let score = 1; score <= target; score++)
			for (let taken = 1; taken <= count && taken * marks <= score; taken++)
				next[score] =
					((next[score] ?? 0) + (ways[score - taken * marks] ?? 0)) % MOD;
		ways = next;
	}
	return ways[target] ?? 0;
};
