/**
 * 3269. Constructing Two Increasing Arrays
 *
 * Replace every 0 in `nums1` and `nums2` with a positive even number and
 * every 1 with a positive odd number so both arrays strictly increase and
 * no number is used twice. Returns the smallest possible largest number.
 *
 * Hand out numbers in increasing order, which keeps them distinct. Let
 * `best[i][j]` be the smallest largest number after filling the first i of
 * `nums1` and j of `nums2`; the next one is the smallest number of the
 * right parity above it.
 *
 * @see https://leetcode.com/problems/constructing-two-increasing-arrays/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * constructingTwoIncreasingArrays([], [1, 0, 1, 1]); // 5
 */
export const constructingTwoIncreasingArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const after = (x: number, parity: number): number =>
		x + 1 + ((x + 1) % 2 === parity ? 0 : 1);
	const m = nums1.length;
	const n = nums2.length;
	let previous = new Array<number>(n + 1).fill(0);
	for (let j = 1; j <= n; j++)
		previous[j] = after(previous[j - 1] ?? 0, nums2[j - 1] ?? 0);
	for (let i = 1; i <= m; i++) {
		const row = new Array<number>(n + 1).fill(0);
		row[0] = after(previous[0] ?? 0, nums1[i - 1] ?? 0);
		for (let j = 1; j <= n; j++)
			row[j] = Math.min(
				after(previous[j] ?? 0, nums1[i - 1] ?? 0),
				after(row[j - 1] ?? 0, nums2[j - 1] ?? 0),
			);
		previous = row;
	}
	return previous[n] ?? 0;
};
