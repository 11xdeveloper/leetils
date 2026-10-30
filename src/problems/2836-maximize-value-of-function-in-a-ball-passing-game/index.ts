/**
 * 2836. Maximize Value of Function in a Ball Passing Game
 *
 * Player `i` passes to `receiver[i]`. Starting from player `x`, the score
 * adds the indices of `x` and of everyone receiving the ball over `k`
 * passes. Returns the best score over all starting players.
 *
 * Binary lifting: for each power of two, record where the ball lands and
 * the sum of receivers along the way, then combine the powers in `k`.
 *
 * @see https://leetcode.com/problems/maximize-value-of-function-in-a-ball-passing-game/
 * @difficulty Hard
 * @timeComplexity O(n log k)
 * @spaceComplexity O(n log k)
 *
 * @example
 * maximizeValueOfFunctionInABallPassingGame([2, 0, 1], 4); // 6
 */
export const maximizeValueOfFunctionInABallPassingGame = (
	receiver: readonly number[],
	k: number,
): number => {
	const n = receiver.length;
	const jumps: Int32Array[] = [Int32Array.from(receiver)];
	const sums: Float64Array[] = [Float64Array.from(receiver)];
	for (let level = 1; 2 ** level <= k; level++) {
		const jump = jumps[level - 1] ?? new Int32Array(n);
		const sum = sums[level - 1] ?? new Float64Array(n);
		const nextJump = new Int32Array(n);
		const nextSum = new Float64Array(n);
		for (let i = 0; i < n; i++) {
			const mid = jump[i] ?? 0;
			nextJump[i] = jump[mid] ?? 0;
			nextSum[i] = (sum[i] ?? 0) + (sum[mid] ?? 0);
		}
		jumps.push(nextJump);
		sums.push(nextSum);
	}

	let best = 0;
	for (let start = 0; start < n; start++) {
		let at = start;
		let score = start;
		for (
			let level = 0, rest = k;
			rest > 0;
			level++, rest = Math.floor(rest / 2)
		)
			if (rest % 2 === 1) {
				score += sums[level]?.[at] ?? 0;
				at = jumps[level]?.[at] ?? 0;
			}
		best = Math.max(best, score);
	}
	return best;
};
