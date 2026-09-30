/**
 * 837. New 21 Game
 *
 * Alice starts with 0 points and draws a uniformly random number from 1 to
 * `maxPts` while she has fewer than `k` points. Returns the probability she
 * ends with at most `n` points.
 *
 * `p[x]` is the probability of ever having exactly `x` points: the sum of
 * `p[x - i] / maxPts` over the last `maxPts` totals from which she still
 * draws (those below `k`). A sliding window keeps that sum.
 *
 * @see https://leetcode.com/problems/new-21-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * new21Game(21, 17, 10); // ≈ 0.73278
 */
export const new21Game = (n: number, k: number, maxPts: number): number => {
	if (k === 0 || n >= k - 1 + maxPts) return 1;
	const p = new Array<number>(n + 1).fill(0);
	p[0] = 1;
	let window = 1;
	let answer = 0;
	for (let x = 1; x <= n; x++) {
		p[x] = window / maxPts;
		if (x < k) window += p[x] ?? 0;
		else answer += p[x] ?? 0;
		if (x - maxPts >= 0 && x - maxPts < k) window -= p[x - maxPts] ?? 0;
	}
	return answer;
};
