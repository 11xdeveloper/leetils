/**
 * 668. Kth Smallest Number in Multiplication Table
 *
 * Returns the `k`th smallest number (from 1) in the `m × n` multiplication
 * table, where row `i` column `j` holds `i · j`.
 *
 * Binary search on the value. Row `i` has `min(⌊x / i⌋, n)` entries at most
 * `x`, so counting entries up to `x` takes one pass over the rows. The
 * answer is the smallest `x` with at least `k` of them.
 *
 * @see https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/
 * @difficulty Hard
 * @timeComplexity O(m · log(m · n))
 * @spaceComplexity O(1)
 *
 * @example
 * kthSmallestNumberInMultiplicationTable(3, 3, 5); // 3: 1, 2, 2, 3, 3, 4, 6, 6, 9
 */
export const kthSmallestNumberInMultiplicationTable = (
	m: number,
	n: number,
	k: number,
): number => {
	let low = 1;
	let high = m * n;
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		let count = 0;
		for (let row = 1; row <= m; row++)
			count += Math.min(Math.floor(mid / row), n);
		if (count >= k) high = mid;
		else low = mid + 1;
	}
	return low;
};
