/**
 * 765. Couples Holding Hands
 *
 * `row[i]` is the person in seat `i`; couples are `(0, 1)`, `(2, 3)`, and so
 * on. Returns the fewest swaps of two people that seat every couple side by
 * side, in seats `2i` and `2i + 1`.
 *
 * Greedy: for each pair of seats, if the second person isn't the first's
 * partner, swap the partner in. Each swap seats at least one couple for
 * good, and is necessary: think of couples as nodes joined by shared seat
 * pairs, and each cycle of `k` couples needs exactly `k - 1` swaps.
 *
 * @see https://leetcode.com/problems/couples-holding-hands/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * couplesHoldingHands([0, 2, 1, 3]); // 1
 */
export const couplesHoldingHands = (row: readonly number[]): number => {
	const seats = [...row];
	const seatOf = new Array<number>(seats.length);
	for (const [seat, person] of seats.entries()) seatOf[person] = seat;

	let swaps = 0;
	for (let seat = 0; seat < seats.length; seat += 2) {
		const partner = (seats[seat] ?? 0) ^ 1;
		const neighbour = seats[seat + 1] ?? 0;
		if (neighbour === partner) continue;
		const partnerSeat = seatOf[partner] ?? 0;
		seats[partnerSeat] = neighbour;
		seatOf[neighbour] = partnerSeat;
		seats[seat + 1] = partner;
		seatOf[partner] = seat + 1;
		swaps++;
	}
	return swaps;
};
