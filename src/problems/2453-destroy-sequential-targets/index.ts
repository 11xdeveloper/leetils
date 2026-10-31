/**
 * 2453. Destroy Sequential Targets
 *
 * Seeding `nums[i]` destroys every target equal to `nums[i] + c · space`
 * for `c >= 0`. Returns the smallest seed destroying the most targets.
 *
 * Seeds with the same remainder mod `space` hit the same family; the
 * smallest member of the largest family is the answer.
 *
 * @see https://leetcode.com/problems/destroy-sequential-targets/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * destroySequentialTargets([3, 7, 8, 1, 1, 5], 2); // 1
 */
export const destroySequentialTargets = (
	nums: readonly number[],
	space: number,
): number => {
	const counts = new Map<number, number>();
	for (const num of nums)
		counts.set(num % space, (counts.get(num % space) ?? 0) + 1);
	let [best, bestCount] = [Infinity, 0];
	for (const num of nums) {
		const count = counts.get(num % space) ?? 0;
		if (count > bestCount || (count === bestCount && num < best))
			[best, bestCount] = [num, count];
	}
	return best;
};
