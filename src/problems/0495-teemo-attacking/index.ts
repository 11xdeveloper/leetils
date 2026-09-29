/**
 * 495. Teemo Attacking
 *
 * Each attack at time `t` (in increasing order) poisons for `duration`
 * seconds, covering `[t, t + duration - 1]`; attacking again while poisoned
 * restarts the timer. Returns the total number of seconds poisoned.
 *
 * Each attack adds its full duration, unless the next attack cuts it short,
 * in which case it adds only the gap until then.
 *
 * @see https://leetcode.com/problems/teemo-attacking/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * teemoAttacking([1, 2], 2); // 3
 */
export const teemoAttacking = (
	timeSeries: readonly number[],
	duration: number,
): number => {
	let total = 0;
	for (const [i, time] of timeSeries.entries()) {
		const next = timeSeries[i + 1];
		total += next === undefined ? duration : Math.min(duration, next - time);
	}
	return total;
};
