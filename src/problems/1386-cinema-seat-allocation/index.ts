/**
 * 1386. Cinema Seat Allocation
 *
 * A cinema has `n` rows of seats 1–10. A group of four needs seats 2–5,
 * 4–7 or 6–9 in one row, all unreserved. Returns the most groups that fit
 * around `reservedSeats`.
 *
 * A row with no reservations fits two groups. Otherwise it fits two if both
 * 2–5 and 6–9 are free, one if any of the three blocks is, or none. Only
 * rows with reservations need looking at.
 *
 * @see https://leetcode.com/problems/cinema-seat-allocation/
 * @difficulty Medium
 * @timeComplexity O(r) for r reservations
 * @spaceComplexity O(r)
 *
 * @example
 * cinemaSeatAllocation(3, [[1, 2], [1, 3], [1, 8], [2, 6], [3, 1], [3, 10]]); // 4
 */
export const cinemaSeatAllocation = (
	n: number,
	reservedSeats: readonly (readonly number[])[],
): number => {
	const reserved = new Map<number, number>();
	for (const [row = 0, seat = 0] of reservedSeats) {
		reserved.set(row, (reserved.get(row) ?? 0) | (1 << seat));
	}
	const [left, middle, right] = [0b0000111100, 0b0011110000, 0b1111000000];
	let groups = 2 * (n - reserved.size);
	for (const mask of reserved.values()) {
		const [leftFree, rightFree] = [(mask & left) === 0, (mask & right) === 0];
		if (leftFree && rightFree) groups += 2;
		else if (leftFree || rightFree || (mask & middle) === 0) groups += 1;
	}
	return groups;
};
