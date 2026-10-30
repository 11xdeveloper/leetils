/**
 * 2951. Find the Peaks
 *
 * Returns the indices of elements strictly greater than both neighbours;
 * the first and last elements never count.
 *
 * Check each inner index.
 *
 * @see https://leetcode.com/problems/find-the-peaks/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findThePeaks([1, 4, 3, 8, 5]); // [1, 3]
 */
export const findThePeaks = (mountain: readonly number[]): number[] => {
	const peaks: number[] = [];
	for (let i = 1; i < mountain.length - 1; i++) {
		const here = mountain[i] ?? 0;
		if (here > (mountain[i - 1] ?? 0) && here > (mountain[i + 1] ?? 0))
			peaks.push(i);
	}
	return peaks;
};
