/**
 * 681. Next Closest Time
 *
 * Returns the next time after `time` (`"HH:MM"`) that uses only the digits
 * in `time`, each as often as wanted, wrapping round to the next day if
 * needed. If no other time works, that's the same time a day later.
 *
 * Steps forward one minute at a time, at most a day, until a time uses only
 * the allowed digits.
 *
 * @see https://leetcode.com/problems/next-closest-time/
 * @difficulty Medium
 * @timeComplexity O(1): at most 1,440 minutes
 * @spaceComplexity O(1)
 *
 * @example
 * nextClosestTime("19:34"); // "19:39"
 */
export const nextClosestTime = (time: string): string => {
	const allowed = new Set(time.replace(":", ""));
	const start = Number(time.slice(0, 2)) * 60 + Number(time.slice(3));

	for (let step = 1; step <= 1440; step++) {
		const minutes = (start + step) % 1440;
		const candidate = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
		if ([...candidate.replace(":", "")].every((digit) => allowed.has(digit)))
			return candidate;
	}

	return time;
};
