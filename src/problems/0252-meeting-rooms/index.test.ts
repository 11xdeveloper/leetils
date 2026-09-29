import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { meetingRooms } from ".";

const byBruteForce = (intervals: number[][]): boolean =>
	intervals.every(([a0 = 0, a1 = 0], i) =>
		intervals.every(([b0 = 0, b1 = 0], j) => i === j || a1 <= b0 || b1 <= a0),
	);

describe("252. Meeting Rooms", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			meetingRooms([
				[0, 30],
				[5, 10],
				[15, 20],
			]),
		).toBeFalse();
		expect(
			meetingRooms([
				[7, 10],
				[2, 4],
			]),
		).toBeTrue();
	});

	it("allows a meeting to start when another ends", () => {
		expect(
			meetingRooms([
				[1, 5],
				[5, 10],
			]),
		).toBeTrue();
	});

	it("handles no meetings", () => {
		expect(meetingRooms([])).toBeTrue();
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(252);
		for (let run = 0; run < 1000; run++) {
			const intervals = Array.from({ length: random.int(0, 5) }, () => {
				const start = random.int(0, 30);
				return [start, start + random.int(1, 8)];
			});
			expect(meetingRooms(intervals)).toBe(byBruteForce(intervals));
		}
	});
});
