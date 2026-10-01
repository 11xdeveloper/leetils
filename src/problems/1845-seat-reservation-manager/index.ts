import { Heap } from "../../internal/heap";

/**
 * 1845. Seat Reservation Manager
 *
 * Manages seats `1 … n`: `reserve` takes the smallest free seat and
 * `unreserve` frees one.
 *
 * Seats above a high-water mark have never been taken, so only freed
 * seats go into a min-heap; reserve prefers the heap, then the mark.
 *
 * @see https://leetcode.com/problems/seat-reservation-manager/
 * @difficulty Medium
 * @timeComplexity O(log n) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const seats = new SeatReservationManager(5);
 * seats.reserve(); // 1
 * seats.reserve(); // 2
 * seats.unreserve(2);
 * seats.reserve(); // 2
 */
export class SeatReservationManager {
	readonly #freed = new Heap<number>((a, b) => a - b);
	#next = 1;

	constructor(_n: number) {}

	reserve(): number {
		const seat = this.#freed.pop();
		if (seat !== undefined) return seat;
		this.#next++;
		return this.#next - 1;
	}

	unreserve(seatNumber: number): void {
		this.#freed.push(seatNumber);
	}
}
