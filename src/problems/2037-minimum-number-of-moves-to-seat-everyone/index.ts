/**
 * 2037. Minimum Number of Moves to Seat Everyone
 *
 * Each move shifts a student one position. Returns the fewest moves to
 * seat every student in a distinct seat.
 *
 * Matching both in sorted order is optimal.
 *
 * @see https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfMovesToSeatEveryone([3, 1, 5], [2, 7, 4]); // 4
 */
export const minimumNumberOfMovesToSeatEveryone = (
	seats: readonly number[],
	students: readonly number[],
): number => {
	const sortedStudents = students.toSorted((a, b) => a - b);
	return seats
		.toSorted((a, b) => a - b)
		.reduce(
			(moves, seat, i) => moves + Math.abs(seat - (sortedStudents[i] ?? 0)),
			0,
		);
};
