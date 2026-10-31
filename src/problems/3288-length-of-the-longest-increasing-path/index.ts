/**
 * 3288. Length of the Longest Increasing Path
 *
 * The longest sequence of points, strictly increasing in both x and y,
 * that includes `coordinates[k]`.
 *
 * Points before it in the path must be below-left of it and points after
 * above-right. In each group, sort by x (ties by y descending, so equal x
 * can't chain) and find the longest strictly increasing run of y with
 * patience sorting.
 *
 * @see https://leetcode.com/problems/length-of-the-longest-increasing-path/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * lengthOfTheLongestIncreasingPath([[3, 1], [2, 2], [4, 1], [0, 0], [5, 3]], 1); // 3
 */
export const lengthOfTheLongestIncreasingPath = (
	coordinates: readonly (readonly number[])[],
	k: number,
): number => {
	const [kx = 0, ky = 0] = coordinates[k] ?? [];
	const longest = (points: (readonly number[])[]): number => {
		points.sort(
			(a, b) => (a[0] ?? 0) - (b[0] ?? 0) || (b[1] ?? 0) - (a[1] ?? 0),
		);
		const tails: number[] = [];
		for (const [, y = 0] of points) {
			let lo = 0;
			let hi = tails.length;
			while (lo < hi) {
				const mid = (lo + hi) >>> 1;
				if ((tails[mid] ?? 0) < y) lo = mid + 1;
				else hi = mid;
			}
			tails[lo] = y;
		}
		return tails.length;
	};
	const before = coordinates.filter(([x = 0, y = 0]) => x < kx && y < ky);
	const after = coordinates.filter(([x = 0, y = 0]) => x > kx && y > ky);
	return longest(before) + 1 + longest(after);
};
