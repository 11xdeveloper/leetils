/**
 * 2141. Maximum Running Time of N Computers
 *
 * Batteries can be swapped between `n` computers at any moment, but each
 * battery powers one computer at a time. Returns the most minutes all `n`
 * can run together.
 *
 * A battery larger than the average share can't give more than the full
 * run time, so dedicate it to one computer and drop both. Once no battery
 * exceeds the average, the remaining charge can be shared evenly.
 *
 * @see https://leetcode.com/problems/maximum-running-time-of-n-computers/
 * @difficulty Hard
 * @timeComplexity O(m log m)
 * @spaceComplexity O(m)
 *
 * @example
 * maximumRunningTimeOfNComputers(2, [3, 3, 3]); // 4
 */
export const maximumRunningTimeOfNComputers = (
	n: number,
	batteries: readonly number[],
): number => {
	const sorted = batteries.toSorted((a, b) => b - a);
	let total = sorted.reduce((sum, b) => sum + b, 0);
	for (const battery of sorted) {
		if (battery <= total / n) break;
		total -= battery;
		n--;
	}
	return Math.floor(total / n);
};
