/**
 * 3857. Minimum Cost to Split into Ones
 *
 * Splitting x into a + b costs a · b. Returns the least cost to split `n`
 * all the way into ones.
 *
 * Every split pays once for each pair of units it separates, and every
 * pair is separated exactly once, so any order costs n(n - 1)/2.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-split-into-ones/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCostToSplitIntoOnes(4); // 6
 */
export const minimumCostToSplitIntoOnes = (n: number): number =>
	(n * (n - 1)) / 2;
