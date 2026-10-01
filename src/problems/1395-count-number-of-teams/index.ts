/**
 * 1395. Count Number of Teams
 *
 * Counts the triples of soldiers `i < j < k` whose (distinct) ratings are
 * strictly increasing or strictly decreasing.
 *
 * Fixes the middle soldier: an increasing team pairs a smaller rating on
 * its left with a larger one on its right, and a decreasing team the
 * reverse. Counting those four groups for each middle soldier gives the
 * total.
 *
 * @see https://leetcode.com/problems/count-number-of-teams/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * countNumberOfTeams([2, 5, 3, 4, 1]); // 3
 */
export const countNumberOfTeams = (rating: readonly number[]): number => {
	let teams = 0;
	rating.forEach((middle, j) => {
		let [leftLess, leftMore, rightLess, rightMore] = [0, 0, 0, 0];
		rating.forEach((other, i) => {
			if (i < j) {
				if (other < middle) leftLess++;
				else leftMore++;
			} else if (i > j) {
				if (other < middle) rightLess++;
				else rightMore++;
			}
		});
		teams += leftLess * rightMore + leftMore * rightLess;
	});
	return teams;
};
