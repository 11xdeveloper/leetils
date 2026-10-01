import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { MyCalendarI as MyCalendar } from ".";

describe("729. My Calendar I", () => {
	it("solves the example from the problem statement", () => {
		const calendar = new MyCalendar();
		expect(calendar.book(10, 20)).toBeTrue();
		expect(calendar.book(15, 25)).toBeFalse();
		expect(calendar.book(20, 30)).toBeTrue();
	});

	it("matches checking every booked event on random bookings", () => {
		const random = createRandom(729);
		for (let run = 0; run < 200; run++) {
			const calendar = new MyCalendar();
			const booked: number[][] = [];
			for (let i = 0; i < 30; i++) {
				const start = random.int(0, 50);
				const end = start + random.int(1, 8);
				const free = booked.every(([s = 0, e = 0]) => end <= s || e <= start);
				expect(calendar.book(start, end)).toBe(free);
				if (free) booked.push([start, end]);
			}
		}
	});
});
