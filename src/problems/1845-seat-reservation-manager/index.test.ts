import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { SeatReservationManager as SeatManager } from ".";

describe("1845. Seat Reservation Manager", () => {
	it("solves the example from the problem statement", () => {
		const seats = new SeatManager(5);
		expect(seats.reserve()).toBe(1);
		expect(seats.reserve()).toBe(2);
		seats.unreserve(2);
		expect([
			seats.reserve(),
			seats.reserve(),
			seats.reserve(),
			seats.reserve(),
		]).toEqual([2, 3, 4, 5]);
		seats.unreserve(5);
	});

	it("matches a set of free seats on random operations", () => {
		const random = createRandom(1845);
		for (let run = 0; run < 30; run++) {
			const n = random.int(1, 20);
			const seats = new SeatManager(n);
			const free = new Set(Array.from({ length: n }, (_, i) => i + 1));
			for (let op = 0; op < 200; op++) {
				const reserved = Array.from({ length: n }, (_, i) => i + 1).filter(
					(s) => !free.has(s),
				);
				if (
					free.size > 0 &&
					(reserved.length === 0 || random.int(0, 1) === 0)
				) {
					const expected = Math.min(...free);
					free.delete(expected);
					expect(seats.reserve()).toBe(expected);
				} else {
					const seat = reserved[random.int(0, reserved.length - 1)] ?? 1;
					seats.unreserve(seat);
					free.add(seat);
				}
			}
		}
	});
});
