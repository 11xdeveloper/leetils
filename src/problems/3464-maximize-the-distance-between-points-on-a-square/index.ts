/**
 * 3464. Maximize the Distance Between Points on a Square
 *
 * Choose `k` of the points on the boundary of a square of side `side` to
 * make the smallest Manhattan distance between two chosen points as large
 * as possible. Returns that distance.
 *
 * With k ≥ 4 the answer is at most `side`, and for such distances the
 * Manhattan distance between boundary points agrees with the distance
 * around the boundary. So unroll the boundary into a line, sort, and
 * binary search the distance: precompute each point's next point at least
 * that far on, and check whether some start can hop k - 1 times and still
 * leave the gap back round to it.
 *
 * @see https://leetcode.com/problems/maximize-the-distance-between-points-on-a-square/
 * @difficulty Hard
 * @timeComplexity O(n log n + n k log side)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeTheDistanceBetweenPointsOnASquare(2, [[0, 2], [2, 0], [2, 2], [0, 0]], 4); // 2
 */
export const maximizeTheDistanceBetweenPointsOnASquare = (
	side: number,
	points: readonly (readonly number[])[],
	k: number,
): number => {
	const perimeter = 4 * side;
	const positions = points
		.map(([x = 0, y = 0]) => {
			if (x === 0) return y;
			if (y === side) return side + x;
			if (x === side) return 3 * side - y;
			return 4 * side - x;
		})
		.sort((a, b) => a - b);
	const n = positions.length;
	const fits = (d: number): boolean => {
		const next = new Int32Array(n);
		for (let i = 0, j = 0; i < n; i++) {
			j = Math.max(j, i + 1);
			while (j < n && (positions[j] ?? 0) - (positions[i] ?? 0) < d) j++;
			next[i] = j;
		}
		for (let start = 0; start < n; start++) {
			const first = positions[start] ?? 0;
			if (first - (positions[0] ?? 0) >= d && start > 0) break;
			let at = start;
			let picked = 1;
			while (picked < k && at < n) {
				at = next[at] ?? n;
				if (at < n) picked++;
			}
			if (
				picked === k &&
				at < n &&
				first + perimeter - (positions[at] ?? 0) >= d
			)
				return true;
		}
		return false;
	};
	let lo = 1;
	let hi = side;
	while (lo < hi) {
		const mid = Math.ceil((lo + hi) / 2);
		if (fits(mid)) lo = mid;
		else hi = mid - 1;
	}
	return lo;
};
