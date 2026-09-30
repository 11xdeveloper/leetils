/**
 * 855. Exam Room
 *
 * An exam room has seats 0 to `n - 1`. Each student `seat`s where their
 * distance to the closest other student is greatest (the lowest such seat
 * on a tie; seat 0 if the room is empty) and the seat is returned. `leave`
 * frees a seat.
 *
 * Keeps the occupied seats sorted. Seating scans the gaps: the ends of the
 * room and the middle of each gap between neighbours.
 *
 * @see https://leetcode.com/problems/exam-room/
 * @difficulty Medium
 * @timeComplexity O(k) per operation for k students
 * @spaceComplexity O(k)
 *
 * @example
 * const room = new ExamRoom(10);
 * room.seat(); // 0
 * room.seat(); // 9
 * room.seat(); // 4
 */
export class ExamRoom {
	readonly #n: number;
	readonly #seats: number[] = [];

	constructor(n: number) {
		this.#n = n;
	}

	seat(): number {
		const seats = this.#seats;
		if (seats.length === 0) {
			seats.push(0);
			return 0;
		}

		let best = 0;
		let bestDistance = seats[0] ?? 0;
		for (let i = 0; i + 1 < seats.length; i++) {
			const [left, right] = [seats[i] ?? 0, seats[i + 1] ?? 0];
			const distance = Math.floor((right - left) / 2);
			if (distance > bestDistance) {
				bestDistance = distance;
				best = left + distance;
			}
		}
		if (this.#n - 1 - (seats.at(-1) ?? 0) > bestDistance) best = this.#n - 1;

		let at = 0;
		while (at < seats.length && (seats[at] ?? 0) < best) at++;
		seats.splice(at, 0, best);
		return best;
	}

	leave(p: number): void {
		this.#seats.splice(this.#seats.indexOf(p), 1);
	}
}
