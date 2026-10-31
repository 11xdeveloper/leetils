/**
 * 3986. Number of Elapsed Seconds Between Two Times
 *
 * The seconds from `startTime` to `endTime`, both "HH:MM:SS".
 *
 * @see https://leetcode.com/problems/number-of-elapsed-seconds-between-two-times/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfElapsedSecondsBetweenTwoTimes("12:34:56", "13:00:00"); // 1504
 */
export const numberOfElapsedSecondsBetweenTwoTimes = (
	startTime: string,
	endTime: string,
): number => {
	const seconds = (time: string) => {
		const [h = 0, m = 0, s = 0] = time.split(":").map(Number);
		return h * 3600 + m * 60 + s;
	};
	return seconds(endTime) - seconds(startTime);
};
