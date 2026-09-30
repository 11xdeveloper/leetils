/**
 * 1340. Jump Game V
 *
 * From index `i` you may jump up to `d` places left or right to a lower
 * index, provided everything jumped over is also lower than `arr[i]`.
 * Returns the most indices a single walk can visit.
 *
 * Jumps always go downhill, so process indices from the lowest value up:
 * `best[i]` is 1 plus the best among the indices reachable from `i`,
 * scanning outwards in each direction until something at least as tall
 * blocks the way.
 *
 * @see https://leetcode.com/problems/jump-game-v/
 * @difficulty Hard
 * @timeComplexity O(n log n + n · d)
 * @spaceComplexity O(n)
 *
 * @example
 * jumpGameV([6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12], 2); // 4
 */
export const jumpGameV = (arr: readonly number[], d: number): number => {
	const n = arr.length;
	const best = new Array<number>(n).fill(1);
	const order = Array.from({ length: n }, (_, i) => i).sort(
		(a, b) => (arr[a] ?? 0) - (arr[b] ?? 0),
	);
	for (const i of order) {
		const height = arr[i] ?? 0;
		for (const step of [-1, 1]) {
			for (
				let j = i + step;
				j >= 0 && j < n && Math.abs(j - i) <= d;
				j += step
			) {
				if ((arr[j] ?? 0) >= height) break;
				best[i] = Math.max(best[i] ?? 1, (best[j] ?? 1) + 1);
			}
		}
	}
	return Math.max(...best);
};
