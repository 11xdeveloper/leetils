/**
 * 1904. The Number of Full Rounds You Have Played
 *
 * Rounds start every 15 minutes. Returns how many full rounds fit between
 * `loginTime` and `logoutTime` (`hh:mm`), wrapping past midnight when the
 * logout is earlier.
 *
 * Round the login up and the logout down to quarter hours and count the
 * quarters between.
 *
 * @see https://leetcode.com/problems/the-number-of-full-rounds-you-have-played/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * theNumberOfFullRoundsYouHavePlayed("21:30", "03:00"); // 22
 */
export const theNumberOfFullRoundsYouHavePlayed = (
	loginTime: string,
	logoutTime: string,
): number => {
	const minutes = (time: string) =>
		Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
	const start = minutes(loginTime);
	let end = minutes(logoutTime);
	if (end < start) end += 24 * 60;
	return Math.max(0, Math.floor(end / 15) - Math.ceil(start / 15));
};
