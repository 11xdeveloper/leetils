/**
 * 1981. Minimize the Difference Between Target and Chosen Elements
 *
 * Choosing one element from each row of `mat` (values ≤ 70, at most 70
 * rows), returns the smallest `|sum − target|`.
 *
 * Track every reachable sum row by row. Sums above the target only matter
 * through the smallest of them, so keep just one sum above the target.
 *
 * @see https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements/
 * @difficulty Medium
 * @timeComplexity O(m · n · target)
 * @spaceComplexity O(target)
 *
 * @example
 * minimizeTheDifferenceBetweenTargetAndChosenElements([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 13); // 0
 */
export const minimizeTheDifferenceBetweenTargetAndChosenElements = (
	mat: readonly (readonly number[])[],
	target: number,
): number => {
	let sums = new Set([0]);
	for (const row of mat) {
		const next = new Set<number>();
		let smallestAbove = Infinity;
		for (const sum of sums) {
			for (const value of new Set(row)) {
				const total = sum + value;
				if (total <= target) next.add(total);
				else smallestAbove = Math.min(smallestAbove, total);
			}
		}
		if (smallestAbove !== Infinity) next.add(smallestAbove);
		sums = next;
	}
	return Math.min(...[...sums].map((sum) => Math.abs(sum - target)));
};
