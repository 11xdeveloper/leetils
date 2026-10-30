/**
 * 2928. Distribute Candies Among Children I
 *
 * Returns the number of ways to give `n` candies to three children with
 * none getting more than `limit`.
 *
 * Choose the first two children's shares; the third is then fixed and
 * must fit the limit.
 *
 * @see https://leetcode.com/problems/distribute-candies-among-children-i/
 * @difficulty Easy
 * @timeComplexity O(limit²)
 * @spaceComplexity O(1)
 *
 * @example
 * distributeCandiesAmongChildrenI(5, 2); // 3
 */
export const distributeCandiesAmongChildrenI = (
	n: number,
	limit: number,
): number => {
	let ways = 0;
	for (let a = 0; a <= Math.min(n, limit); a++)
		for (let b = 0; b <= Math.min(n - a, limit); b++)
			if (n - a - b <= limit) ways++;
	return ways;
};
