const gcd = (a: number, b: number): number => {
	let [x, y] = [a, b];
	while (y) [x, y] = [y, x % y];
	return x;
};

/**
 * 3334. Find the Maximum Factor Score of Array
 *
 * An array's factor score is its LCM times its GCD (0 if empty). Returns
 * the largest factor score after removing at most one element of `nums`.
 *
 * Try keeping everything and removing each element in turn. Values are at
 * most 30, so the LCM stays small enough to compute directly.
 *
 * @see https://leetcode.com/problems/find-the-maximum-factor-score-of-array/
 * @difficulty Medium
 * @timeComplexity O(n² log max)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMaximumFactorScoreOfArray([2, 4, 8, 16]); // 64
 */
export const findTheMaximumFactorScoreOfArray = (
	nums: readonly number[],
): number => {
	const score = (skip: number): number => {
		let g = 0;
		let l = 1;
		let any = false;
		nums.forEach((num, i) => {
			if (i === skip) return;
			any = true;
			g = gcd(g, num);
			l = (l / gcd(l, num)) * num;
		});
		return any ? g * l : 0;
	};
	let best = score(-1);
	for (let i = 0; i < nums.length; i++) best = Math.max(best, score(i));
	return best;
};
