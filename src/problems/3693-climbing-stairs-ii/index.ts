/**
 * 3693. Climbing Stairs II
 *
 * From step i, jump to step j (one to three steps up), paying `costs[j - 1]`
 * plus (j - i)². Returns the least cost from step 0 to step `n`.
 *
 * @see https://leetcode.com/problems/climbing-stairs-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * climbingStairsII(4, [1, 2, 3, 4]); // 13
 */
export const climbingStairsII = (
	n: number,
	costs: readonly number[],
): number => {
	const best = [0];
	for (let j = 1; j <= n; j++) {
		let value = Number.POSITIVE_INFINITY;
		for (let jump = 1; jump <= 3 && jump <= j; jump++)
			value = Math.min(value, (best[j - jump] ?? 0) + jump * jump);
		best.push(value + (costs[j - 1] ?? 0));
	}
	return best[n] ?? 0;
};
