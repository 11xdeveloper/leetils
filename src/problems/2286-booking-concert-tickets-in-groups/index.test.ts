import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { BookingConcertTicketsInGroups as BookMyShow } from ".";

/** Tracks used seats per row directly. */
class SimpleHall {
	readonly used: number[];
	constructor(
		n: number,
		readonly m: number,
	) {
		this.used = new Array<number>(n).fill(0);
	}
	gather(k: number, maxRow: number): number[] {
		for (let row = 0; row <= maxRow; row++) {
			const used = this.used[row] ?? 0;
			if (this.m - used < k) continue;
			this.used[row] = used + k;
			return [row, used];
		}
		return [];
	}
	scatter(k: number, maxRow: number): boolean {
		let free = 0;
		for (let row = 0; row <= maxRow; row++)
			free += this.m - (this.used[row] ?? 0);
		if (free < k) return false;
		for (let row = 0; k > 0; row++) {
			const taken = Math.min(k, this.m - (this.used[row] ?? 0));
			this.used[row] = (this.used[row] ?? 0) + taken;
			k -= taken;
		}
		return true;
	}
}

describe("2286. Booking Concert Tickets in Groups", () => {
	it("solves the example from the problem statement", () => {
		const hall = new BookMyShow(2, 5);
		expect(hall.gather(4, 0)).toEqual([0, 0]);
		expect(hall.gather(2, 0)).toEqual([]);
		expect(hall.scatter(5, 1)).toBeTrue();
		expect(hall.scatter(5, 1)).toBeFalse();
	});

	it("matches a simple hall on random bookings", () => {
		const random = createRandom(2286);
		for (let run = 0; run < 30; run++) {
			const [n, m] = [random.int(1, 6), random.int(1, 6)];
			const [hall, expected] = [new BookMyShow(n, m), new SimpleHall(n, m)];
			for (let op = 0; op < 30; op++) {
				const k = random.int(1, m + 1);
				const maxRow = random.int(0, n - 1);
				if (random.int(0, 1))
					expect(hall.gather(k, maxRow)).toEqual(expected.gather(k, maxRow));
				else expect(hall.scatter(k, maxRow)).toBe(expected.scatter(k, maxRow));
			}
		}
	});
});
