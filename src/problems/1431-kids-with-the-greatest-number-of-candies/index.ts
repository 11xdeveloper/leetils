/**
 * 1431. Kids With the Greatest Number of Candies
 *
 * Returns, for each kid, whether they'd have the most candies (ties count)
 * after being given all `extraCandies`.
 *
 * Compares each kid's total with the current maximum.
 *
 * @see https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * kidsWithTheGreatestNumberOfCandies([2, 3, 5, 1, 3], 3); // [true, true, true, false, true]
 */
export const kidsWithTheGreatestNumberOfCandies = (
	candies: readonly number[],
	extraCandies: number,
): boolean[] => {
	const most = Math.max(...candies);
	return candies.map((count) => count + extraCandies >= most);
};
