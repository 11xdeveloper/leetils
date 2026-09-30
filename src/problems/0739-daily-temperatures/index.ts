/**
 * 739. Daily Temperatures
 *
 * For each day, returns how many days until a warmer temperature, or 0 if
 * there's none.
 *
 * A stack of days still waiting for a warmer one, whose temperatures
 * decrease from bottom to top. Each day answers every cooler day on top of
 * the stack.
 *
 * @see https://leetcode.com/problems/daily-temperatures/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]); // [1, 1, 4, 2, 1, 1, 0, 0]
 */
export const dailyTemperatures = (
	temperatures: readonly number[],
): number[] => {
	const answer = new Array<number>(temperatures.length).fill(0);
	const waiting: number[] = [];
	for (const [day, temperature] of temperatures.entries()) {
		while (
			waiting.length > 0 &&
			(temperatures[waiting.at(-1) ?? 0] ?? 0) < temperature
		) {
			const earlier = waiting.pop() ?? 0;
			answer[earlier] = day - earlier;
		}
		waiting.push(day);
	}
	return answer;
};
