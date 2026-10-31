/**
 * 3114. Latest Time You Can Obtain After Replacing Characters
 *
 * Replace each `?` in the 12-hour time `"HH:MM"` (00:00 to 11:59) with a
 * digit to get the latest valid time.
 *
 * Try times from 11:59 down, returning the first that fits the pattern.
 *
 * @see https://leetcode.com/problems/latest-time-you-can-obtain-after-replacing-characters/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * latestTimeYouCanObtainAfterReplacingCharacters("1?:?4"); // "11:54"
 */
export const latestTimeYouCanObtainAfterReplacingCharacters = (
	s: string,
): string => {
	for (let minutes = 11 * 60 + 59; minutes >= 0; minutes--) {
		const time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
		if ([...s].every((char, i) => char === "?" || char === time[i]))
			return time;
	}
	return s;
};
