const bitsSet = (value: number): number => {
	let count = 0;
	for (let rest = value; rest > 0; rest &= rest - 1) count++;
	return count;
};

/**
 * 401. Binary Watch
 *
 * A binary watch shows the hour (0–11) in 4 LEDs and the minute (0–59) in 6.
 * Returns every time it could show with exactly `turnedOn` LEDs lit,
 * written like `"1:05"`.
 *
 * There are only 720 times, so it checks each one's lit LEDs.
 *
 * @see https://leetcode.com/problems/binary-watch/
 * @difficulty Easy
 * @timeComplexity O(1), 720 times
 * @spaceComplexity O(1)
 *
 * @example
 * binaryWatch(1); // ["0:01", "0:02", "0:04", "0:08", "0:16", "0:32", "1:00", "2:00", "4:00", "8:00"]
 */
export const binaryWatch = (turnedOn: number): string[] => {
	const times: string[] = [];
	for (let hour = 0; hour < 12; hour++) {
		for (let minute = 0; minute < 60; minute++) {
			if (bitsSet(hour) + bitsSet(minute) === turnedOn) {
				times.push(`${hour}:${String(minute).padStart(2, "0")}`);
			}
		}
	}
	return times;
};
