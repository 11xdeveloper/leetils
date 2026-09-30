import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { MyCalendarII as MyCalendarTwo } from ".";

describe("731. My Calendar II", () => {
	it("solves the example from the problem statement", () => {
		const calendar = new MyCalendarTwo();
		expect(
			[
				[10, 20],
				[50, 60],
				[10, 40],
				[5, 15],
				[5, 10],
				[25, 55],
			].map(([s = 0, e = 0]) => calendar.book(s, e)),
		).toEqual([true, true, true, false, true, true]);
	});

	it("matches counting bookings at every moment on random inputs", () => {
		const random = createRandom(731);
		for (let run = 0; run < 200; run++) {
			const calendar = new MyCalendarTwo();
			const depth = new Array<number>(60).fill(0);
			for (let i = 0; i < 30; i++) {
				const start = random.int(0, 50);
				const end = start + random.int(1, 8);
				const allowed = depth.slice(start, end).every((count) => count < 2);
				expect(calendar.book(start, end)).toBe(allowed);
				if (allowed)
					for (let t = start; t < end; t++) depth[t] = (depth[t] ?? 0) + 1;
			}
		}
	});
});
