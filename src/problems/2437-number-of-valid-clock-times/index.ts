/**
 * 2437. Number of Valid Clock Times
 *
 * Counts the valid "hh:mm" times matching `time`, where "?" matches any
 * digit.
 *
 * Count matching hours and minutes separately.
 *
 * @see https://leetcode.com/problems/number-of-valid-clock-times/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfValidClockTimes("?5:00"); // 2
 */
export const numberOfValidClockTimes = (time: string): number => {
	const matches = (pattern: string, limit: number): number => {
		let count = 0;
		for (let value = 0; value < limit; value++) {
			const digits = String(value).padStart(2, "0");
			if ([...pattern].every((char, i) => char === "?" || char === digits[i]))
				count++;
		}
		return count;
	};
	return matches(time.slice(0, 2), 24) * matches(time.slice(3), 60);
};
