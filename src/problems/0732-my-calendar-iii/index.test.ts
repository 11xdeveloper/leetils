import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { MyCalendarIII as MyCalendarThree } from ".";

describe("732. My Calendar III", () => {
	it("solves the example from the problem statement", () => {
		const calendar = new MyCalendarThree();
		expect(
			[
				[10, 20],
				[50, 60],
				[10, 40],
				[5, 15],
				[5, 10],
				[25, 55],
			].map(([s = 0, e = 0]) => calendar.book(s, e)),
		).toEqual([1, 1, 2, 3, 3, 3]);
	});

	it("matches counting bookings at every moment on random inputs", () => {
		const random = createRandom(732);
		for (let run = 0; run < 200; run++) {
			const calendar = new MyCalendarThree();
			const depth = new Array<number>(60).fill(0);
			for (let i = 0; i < 30; i++) {
				const start = random.int(0, 50);
				const end = start + random.int(1, 8);
				for (let t = start; t < end; t++) depth[t] = (depth[t] ?? 0) + 1;
				expect(calendar.book(start, end)).toBe(Math.max(...depth));
			}
		}
	});
});
