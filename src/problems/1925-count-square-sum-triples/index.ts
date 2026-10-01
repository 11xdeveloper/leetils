/**
 * 1925. Count Square Sum Triples
 *
 * Counts the ordered triples `(a, b, c)` in `1 … n` with
 * `a² + b² = c²`.
 *
 * Try every pair `(a, b)` and check whether `a² + b²` is a perfect square
 * no larger than `n²`.
 *
 * @see https://leetcode.com/problems/count-square-sum-triples/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * countSquareSumTriples(10); // 4
 */
export const countSquareSumTriples = (n: number): number => {
	let count = 0;
	for (let a = 1; a <= n; a++) {
		for (let b = 1; b <= n; b++) {
			const c = Math.round(Math.sqrt(a * a + b * b));
			if (c <= n && c * c === a * a + b * b) count++;
		}
	}
	return count;
};
