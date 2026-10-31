/**
 * 3154. Find Number of Ways to Reach the K-th Stair
 *
 * Alice starts on stair 1 with `jump = 0`. She can go down one stair (not
 * twice in a row, and not below 0) or up `2^jump` stairs, which then
 * increases `jump`. Returns how many operation sequences end on stair `k`.
 *
 * After j jumps up she has climbed 2^j - 1, so she needs exactly
 * d = 2^j - k downs. Those can't be consecutive, so they go in distinct
 * gaps around the jumps: C(j + 1, d) ways. Add this up over the few j that
 * work.
 *
 * @see https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-th-stair/
 * @difficulty Hard
 * @timeComplexity O(log² k)
 * @spaceComplexity O(1)
 *
 * @example
 * findNumberOfWaysToReachTheKThStair(0); // 2
 */
export const findNumberOfWaysToReachTheKThStair = (k: number): number => {
	const choose = (n: number, r: number): number => {
		let result = 1;
		for (let i = 1; i <= r; i++) result = (result * (n - r + i)) / i;
		return result;
	};
	let ways = 0;
	for (let j = 0; j < 32; j++) {
		const downs = 2 ** j - k;
		if (downs >= 0 && downs <= j + 1) ways += choose(j + 1, downs);
	}
	return ways;
};
