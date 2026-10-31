/**
 * 3290. Maximum Multiplication Score
 *
 * Pick indices i₀ < i₁ < i₂ < i₃ of `b` to maximise
 * `a[0]·b[i₀] + a[1]·b[i₁] + a[2]·b[i₂] + a[3]·b[i₃]`.
 *
 * Keep the best score for each number of `a`'s entries used so far, going
 * through `b` in order and updating from the most used down.
 *
 * @see https://leetcode.com/problems/maximum-multiplication-score/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumMultiplicationScore([3, 2, 5, 6], [2, -6, 4, -5, -3, 2, -7]); // 26
 */
export const maximumMultiplicationScore = (
	a: readonly number[],
	b: readonly number[],
): number => {
	const best = [
		0,
		...new Array<number>(a.length).fill(Number.NEGATIVE_INFINITY),
	];
	for (const value of b)
		for (let used = a.length; used >= 1; used--)
			best[used] = Math.max(
				best[used] ?? 0,
				(best[used - 1] ?? 0) + (a[used - 1] ?? 0) * value,
			);
	return best[a.length] ?? 0;
};
