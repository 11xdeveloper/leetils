/**
 * 1742. Maximum Number of Balls in a Box
 *
 * Each ball numbered `lowLimit … highLimit` goes in the box numbered by
 * its digit sum. Returns how many balls the fullest box holds.
 *
 * Counts digit sums.
 *
 * @see https://leetcode.com/problems/maximum-number-of-balls-in-a-box/
 * @difficulty Easy
 * @timeComplexity O(n log h)
 * @spaceComplexity O(log h)
 *
 * @example
 * maximumNumberOfBallsInABox(1, 10); // 2
 */
export const maximumNumberOfBallsInABox = (
	lowLimit: number,
	highLimit: number,
): number => {
	const boxes = new Map<number, number>();
	for (let ball = lowLimit; ball <= highLimit; ball++) {
		let sum = 0;
		for (let rest = ball; rest > 0; rest = Math.floor(rest / 10))
			sum += rest % 10;
		boxes.set(sum, (boxes.get(sum) ?? 0) + 1);
	}
	return Math.max(...boxes.values());
};
