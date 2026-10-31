/**
 * 3890. Integers With Multiple Sum of Two Cubes
 *
 * Lists, in increasing order, the integers up to `n` that are a³ + b³
 * (0 < a ≤ b) in at least two ways.
 *
 * Count every sum of two cubes up to n.
 *
 * @see https://leetcode.com/problems/integers-with-multiple-sum-of-two-cubes/
 * @difficulty Medium
 * @timeComplexity O(n^(2/3))
 * @spaceComplexity O(n^(2/3))
 *
 * @example
 * integersWithMultipleSumOfTwoCubes(4104); // [1729, 4104]
 */
export const integersWithMultipleSumOfTwoCubes = (n: number): number[] => {
	const ways = new Map<number, number>();
	for (let a = 1; 2 * a ** 3 <= n; a++)
		for (let b = a; a ** 3 + b ** 3 <= n; b++) {
			const x = a ** 3 + b ** 3;
			ways.set(x, (ways.get(x) ?? 0) + 1);
		}
	return [...ways]
		.filter(([, count]) => count >= 2)
		.map(([x]) => x)
		.sort((a, b) => a - b);
};
