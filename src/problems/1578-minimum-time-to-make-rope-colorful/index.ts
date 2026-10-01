/**
 * 1578. Minimum Time to Make Rope Colorful
 *
 * Removing balloon `i` takes `neededTime[i]`. Returns the least time to
 * remove balloons so no two neighbours share a colour.
 *
 * Each run of one colour keeps exactly one balloon, best the slowest to
 * remove, so the cost is the run's total minus its maximum.
 *
 * @see https://leetcode.com/problems/minimum-time-to-make-rope-colorful/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumTimeToMakeRopeColorful("aabaa", [1, 2, 3, 4, 1]); // 2
 */
export const minimumTimeToMakeRopeColorful = (
	colors: string,
	neededTime: readonly number[],
): number => {
	let [total, runMax] = [0, 0];
	for (let i = 0; i < colors.length; i++) {
		const time = neededTime[i] ?? 0;
		if (i > 0 && colors[i] === colors[i - 1]) {
			total += Math.min(runMax, time);
			runMax = Math.max(runMax, time);
		} else {
			runMax = time;
		}
	}
	return total;
};
