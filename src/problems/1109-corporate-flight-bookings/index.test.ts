import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { corporateFlightBookings as corpFlightBookings } from ".";

/** Adds each booking to every flight it covers. */
const byBruteForce = (bookings: number[][], n: number): number[] => {
	const result = new Array<number>(n).fill(0);
	for (const [first = 1, last = 1, seats = 0] of bookings) {
		for (let flight = first; flight <= last; flight++) {
			result[flight - 1] = (result[flight - 1] ?? 0) + seats;
		}
	}
	return result;
};

describe("1109. Corporate Flight Bookings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			corpFlightBookings(
				[
					[1, 2, 10],
					[2, 3, 20],
					[2, 5, 25],
				],
				5,
			),
		).toEqual([10, 55, 45, 25, 25]);
		expect(
			corpFlightBookings(
				[
					[1, 2, 10],
					[2, 2, 15],
				],
				2,
			),
		).toEqual([10, 25]);
	});

	it("matches adding up each booking on random inputs", () => {
		const random = createRandom(1109);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 20);
			const bookings = Array.from({ length: random.int(1, 10) }, () => {
				const [a, b] = [random.int(1, n), random.int(1, n)];
				return [Math.min(a, b), Math.max(a, b), random.int(1, 100)];
			});
			expect(corpFlightBookings(bookings, n)).toEqual(
				byBruteForce(bookings, n),
			);
		}
	});
});
