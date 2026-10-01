/**
 * 1109. Corporate Flight Bookings
 *
 * `bookings[i] = [first, last, seats]` reserves `seats` seats on each of
 * flights `first … last` (numbered from 1). Returns the total seats reserved
 * on each of the `n` flights.
 *
 * A difference array: each booking adds `seats` at `first` and removes them
 * after `last`, and a running sum gives the totals.
 *
 * @see https://leetcode.com/problems/corporate-flight-bookings/
 * @difficulty Medium
 * @timeComplexity O(n + b) for b bookings
 * @spaceComplexity O(n), for the result
 *
 * @example
 * corporateFlightBookings([[1, 2, 10], [2, 3, 20], [2, 5, 25]], 5); // [10, 55, 45, 25, 25]
 */
export const corporateFlightBookings = (
	bookings: readonly (readonly number[])[],
	n: number,
): number[] => {
	const result = new Array<number>(n).fill(0);
	for (const [first = 1, last = 1, seats = 0] of bookings) {
		result[first - 1] = (result[first - 1] ?? 0) + seats;
		if (last < n) result[last] = (result[last] ?? 0) - seats;
	}
	for (let i = 1; i < n; i++)
		result[i] = (result[i] ?? 0) + (result[i - 1] ?? 0);
	return result;
};
