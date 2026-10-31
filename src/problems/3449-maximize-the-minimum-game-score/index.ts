/**
 * 3449. Maximize the Minimum Game Score
 *
 * Start before index 0 and make at most `m` moves, each one step left or
 * right (staying in the array after the first); every visit to i adds
 * `points[i]` to its score. Returns the largest possible minimum score.
 *
 * Binary search on the minimum X: index i needs ⌈X / points[i]⌉ visits.
 * Sweep left to right, bouncing between i and i + 1 to make up i's
 * shortfall (each bounce also visits i + 1), and skip the last index if
 * the bounces already covered it.
 *
 * @see https://leetcode.com/problems/maximize-the-minimum-game-score/
 * @difficulty Hard
 * @timeComplexity O(n log(m · max))
 * @spaceComplexity O(1)
 *
 * @example
 * maximizeTheMinimumGameScore([2, 4], 3); // 4
 */
export const maximizeTheMinimumGameScore = (
	points: readonly number[],
	m: number,
): number => {
	const n = points.length;
	const reachable = (x: number): boolean => {
		let moves = 0;
		let carried = 0;
		for (let i = 0; i < n; i++) {
			const needed = Math.ceil(x / (points[i] ?? 1)) - carried;
			if (needed > 0) {
				moves += 2 * needed - 1;
				carried = needed - 1;
			} else if (i < n - 1) {
				moves++;
				carried = 0;
			}
			if (moves > m) return false;
		}
		return true;
	};
	let lo = 0;
	let hi = Math.ceil(m / 2 + 1) * Math.max(...points);
	while (lo < hi) {
		const mid = lo + Math.ceil((hi - lo) / 2);
		if (reachable(mid)) lo = mid;
		else hi = mid - 1;
	}
	return lo;
};
