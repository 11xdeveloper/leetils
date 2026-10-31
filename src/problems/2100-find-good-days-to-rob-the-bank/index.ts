/**
 * 2100. Find Good Days to Rob the Bank
 *
 * Day `i` is good when the `time` days before it are non-increasing in
 * guards and the `time` days after it are non-decreasing. Returns the
 * good days in ascending order.
 *
 * Count, for each day, how long the non-increasing run ending there and
 * the non-decreasing run starting there are.
 *
 * @see https://leetcode.com/problems/find-good-days-to-rob-the-bank/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findGoodDaysToRobTheBank([5, 3, 3, 3, 5, 6, 2], 2); // [2, 3]
 */
export const findGoodDaysToRobTheBank = (
	security: readonly number[],
	time: number,
): number[] => {
	const n = security.length;
	const falling = new Array<number>(n).fill(0);
	const rising = new Array<number>(n).fill(0);
	for (let i = 1; i < n; i++) {
		if ((security[i] ?? 0) <= (security[i - 1] ?? 0))
			falling[i] = (falling[i - 1] ?? 0) + 1;
	}
	for (let i = n - 2; i >= 0; i--) {
		if ((security[i] ?? 0) <= (security[i + 1] ?? 0))
			rising[i] = (rising[i + 1] ?? 0) + 1;
	}
	const days: number[] = [];
	for (let i = 0; i < n; i++)
		if ((falling[i] ?? 0) >= time && (rising[i] ?? 0) >= time) days.push(i);
	return days;
};
