/**
 * 3359. Find Sorted Submatrices With Maximum Element at Most K
 *
 * Count the submatrices whose rows are each non-increasing from left to
 * right and whose largest element is at most `k`.
 *
 * For each cell, find how far a qualifying run of its row extends to the
 * left. Each column then is a histogram of those lengths, and the
 * submatrices with their right edge there are counted with a monotonic
 * stack over the rows.
 *
 * @see https://leetcode.com/problems/find-sorted-submatrices-with-maximum-element-at-most-k/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * findSortedSubmatricesWithMaximumElementAtMostK([[4, 3, 2, 1], [8, 7, 6, 1]], 3); // 8
 */
export const findSortedSubmatricesWithMaximumElementAtMostK = (
	grid: readonly (readonly number[])[],
	k: number,
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const run = grid.map((row) => {
		const lengths = new Array<number>(n).fill(0);
		row.forEach((value, c) => {
			if (value > k) return;
			lengths[c] =
				c > 0 && (row[c - 1] ?? 0) >= value && (row[c - 1] ?? 0) <= k
					? (lengths[c - 1] ?? 0) + 1
					: 1;
		});
		return lengths;
	});
	let total = 0;
	for (let c = 0; c < n; c++) {
		// Rectangles with bottom-right corner at (r, c): sum over tops of the smallest run.
		const stack: [height: number, count: number][] = [];
		let sum = 0;
		for (let r = 0; r < m; r++) {
			const height = run[r]?.[c] ?? 0;
			let count = 1;
			while (stack.length > 0 && (stack.at(-1)?.[0] ?? 0) >= height) {
				const [h, rows] = stack.pop() ?? [0, 0];
				sum -= h * rows;
				count += rows;
			}
			stack.push([height, count]);
			sum += height * count;
			total += sum;
		}
	}
	return total;
};
