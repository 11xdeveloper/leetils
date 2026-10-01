/**
 * 1561. Maximum Number of Coins You Can Get
 *
 * Repeatedly pick three piles; Alice takes the largest, you the second and
 * Bob the smallest. Returns the most coins you can end up with.
 *
 * Give Bob the smallest third of the piles. From the rest, sorted, pair
 * each pile you take with the next larger one for Alice: you get every
 * second pile counting down from the second largest.
 *
 * @see https://leetcode.com/problems/maximum-number-of-coins-you-can-get/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfCoinsYouCanGet([2, 4, 1, 2, 7, 8]); // 9
 */
export const maximumNumberOfCoinsYouCanGet = (
	piles: readonly number[],
): number => {
	const sorted = piles.toSorted((a, b) => a - b);
	let total = 0;
	for (
		let i = sorted.length - 2, taken = 0;
		taken < sorted.length / 3;
		i -= 2, taken++
	) {
		total += sorted[i] ?? 0;
	}
	return total;
};
