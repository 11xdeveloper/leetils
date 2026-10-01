/**
 * 1553. Minimum Number of Days to Eat N Oranges
 *
 * Each day you eat one orange, or half of them if the count is even, or
 * two thirds if it's divisible by 3. Returns the fewest days to eat `n`.
 *
 * Eating single oranges is only worth it to reach a multiple of 2 or 3, so
 * from `n` the best is to eat `n mod 2` singly then halve, or `n mod 3`
 * singly then cut to a third. Memoised recursion over those choices only
 * visits O(log² n) counts.
 *
 * @see https://leetcode.com/problems/minimum-number-of-days-to-eat-n-oranges/
 * @difficulty Hard
 * @timeComplexity O(log² n)
 * @spaceComplexity O(log² n)
 *
 * @example
 * minimumNumberOfDaysToEatNOranges(10); // 4
 */
export const minimumNumberOfDaysToEatNOranges = (n: number): number => {
	const memo = new Map<number, number>([
		[0, 0],
		[1, 1],
	]);
	const days = (count: number): number => {
		const cached = memo.get(count);
		if (cached !== undefined) return cached;
		const result = Math.min(
			(count % 2) + 1 + days(Math.floor(count / 2)),
			(count % 3) + 1 + days(Math.floor(count / 3)),
		);
		memo.set(count, result);
		return result;
	};
	return days(n);
};
