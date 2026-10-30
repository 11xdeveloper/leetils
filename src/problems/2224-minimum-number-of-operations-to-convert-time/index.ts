/**
 * 2224. Minimum Number of Operations to Convert Time
 *
 * An operation adds 1, 5, 15 or 60 minutes. Returns the fewest operations
 * to turn the 24-hour time `current` into the later `correct`.
 *
 * Each step divides the next, so greedily use the largest that fits.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-convert-time/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfOperationsToConvertTime("02:30", "04:35"); // 3
 */
export const minimumNumberOfOperationsToConvertTime = (
	current: string,
	correct: string,
): number => {
	const minutes = (time: string): number =>
		Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
	let remaining = minutes(correct) - minutes(current);
	let operations = 0;
	for (const step of [60, 15, 5, 1]) {
		operations += Math.floor(remaining / step);
		remaining %= step;
	}
	return operations;
};
