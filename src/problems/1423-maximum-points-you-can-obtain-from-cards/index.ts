/**
 * 1423. Maximum Points You Can Obtain from Cards
 *
 * Takes `k` cards, each from either end of the row, and returns the largest
 * total.
 *
 * The cards left behind form a contiguous run of `n − k`, so the answer is
 * the total minus the smallest such run, found with a sliding window.
 *
 * @see https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumPointsYouCanObtainFromCards([1, 2, 3, 4, 5, 6, 1], 3); // 12
 */
export const maximumPointsYouCanObtainFromCards = (
	cardPoints: readonly number[],
	k: number,
): number => {
	const keep = cardPoints.length - k;
	let [total, window, smallest] = [0, 0, Infinity];
	cardPoints.forEach((points, i) => {
		total += points;
		window += points - (cardPoints[i - keep] ?? 0);
		if (i >= keep - 1) smallest = Math.min(smallest, window);
	});
	return total - (keep === 0 ? 0 : smallest);
};
