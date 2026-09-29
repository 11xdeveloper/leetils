import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { meetingRoomsII } from ".";

/** The most meetings in progress at any moment, checked at every start time. */
const byCounting = (intervals: number[][]): number =>
	Math.max(
		0,
		...intervals.map(
			([t = 0]) =>
				intervals.filter(([start = 0, end = 0]) => start <= t && t < end)
					.length,
		),
	);

describe("253. Meeting Rooms II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			meetingRoomsII([
				[0, 30],
				[5, 10],
				[15, 20],
			]),
		).toBe(2);
		expect(
			meetingRoomsII([
				[7, 10],
				[2, 4],
			]),
		).toBe(1);
	});

	it("reuses a room freed exactly when the next meeting starts", () => {
		expect(
			meetingRoomsII([
				[1, 5],
				[5, 10],
				[10, 15],
			]),
		).toBe(1);
	});

	it("matches counting overlapping meetings on random inputs", () => {
		const random = createRandom(253);
		for (let run = 0; run < 1000; run++) {
			const intervals = Array.from({ length: random.int(1, 8) }, () => {
				const start = random.int(0, 20);
				return [start, start + random.int(1, 8)];
			});
			expect(meetingRoomsII(intervals)).toBe(byCounting(intervals));
		}
	});
});
