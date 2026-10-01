/**
 * 363. Max Sum of Rectangle No Larger Than K
 *
 * Returns the largest sum of any rectangle of cells in `matrix` that is no
 * larger than `k`. Such a rectangle always exists.
 *
 * Fixes each pair of boundaries along the shorter dimension, collapsing the
 * cells between them into one array of sums. The best subarray sum at most
 * `k` in that array uses prefix sums: for each prefix sum `p`, the answer
 * is `p - q` for the smallest earlier prefix sum `q >= p - k`, found by
 * binary search in a sorted list of earlier prefix sums.
 *
 * @see https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/
 * @difficulty Hard
 * @timeComplexity O(a^2 · b^2) where a and b are the shorter and longer dimensions, from inserting into a sorted array
 * @spaceComplexity O(b)
 *
 * @example
 * maxSumOfRectangleNoLargerThanK([[1, 0, 1], [0, -2, 3]], 2); // 2
 */
export const maxSumOfRectangleNoLargerThanK = (
	matrix: readonly (readonly number[])[],
	k: number,
): number => {
	const rows = matrix.length;
	const columns = matrix[0]?.length ?? 0;
	const transpose = rows > columns;
	const short = transpose ? columns : rows;
	const long = transpose ? rows : columns;
	const at = (i: number, j: number): number =>
		(transpose ? matrix[j]?.[i] : matrix[i]?.[j]) ?? 0;

	let best = Number.NEGATIVE_INFINITY;
	for (let top = 0; top < short; top++) {
		const sums = new Array<number>(long).fill(0);
		for (let bottom = top; bottom < short; bottom++) {
			for (let j = 0; j < long; j++) sums[j] = (sums[j] ?? 0) + at(bottom, j);

			const seen = [0];
			let prefix = 0;
			for (const sum of sums) {
				prefix += sum;
				// The smallest earlier prefix at least prefix - k.
				let low = 0;
				let high = seen.length;
				while (low < high) {
					const mid = Math.floor((low + high) / 2);
					if ((seen[mid] ?? 0) < prefix - k) low = mid + 1;
					else high = mid;
				}
				if (low < seen.length) best = Math.max(best, prefix - (seen[low] ?? 0));
				if (best === k) return k;

				let insertAt = 0;
				let end = seen.length;
				while (insertAt < end) {
					const mid = Math.floor((insertAt + end) / 2);
					if ((seen[mid] ?? 0) < prefix) insertAt = mid + 1;
					else end = mid;
				}
				seen.splice(insertAt, 0, prefix);
			}
		}
	}

	return best;
};
