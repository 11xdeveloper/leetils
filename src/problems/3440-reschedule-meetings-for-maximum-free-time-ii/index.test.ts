import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rescheduleMeetingsForMaximumFreeTimeII as maxFreeTime } from ".";

/** Tries moving each meeting to every free start. */
const byBruteForce = (
	eventTime: number,
	start: number[],
	end: number[],
): number => {
	const longest = (meetings: [number, number][]): number => {
		const sorted = meetings.toSorted((a, b) => a[0] - b[0]);
		let best = 0;
		let last = 0;
		for (const [s, e] of sorted) {
			best = Math.max(best, s - last);
			last = e;
		}
		return Math.max(best, eventTime - last);
	};
	const meetings = start.map((s, i) => [s, end[i] ?? 0] as [number, number]);
	let best = longest(meetings);
	meetings.forEach(([s, e], i) => {
		const others = meetings.filter((_, j) => j !== i);
		for (let at = 0; at + (e - s) <= eventTime; at++)
			if (others.every(([os, oe]) => at + (e - s) <= os || at >= oe))
				best = Math.max(best, longest([...others, [at, at + e - s]]));
	});
	return best;
};

describe("3440. Reschedule Meetings for Maximum Free Time II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFreeTime(5, [1, 3], [2, 5])).toBe(2);
		expect(maxFreeTime(10, [0, 7, 9], [1, 8, 10])).toBe(7);
		expect(maxFreeTime(10, [0, 3, 7, 9], [1, 4, 8, 10])).toBe(6);
		expect(maxFreeTime(5, [0, 1, 2, 3, 4], [1, 2, 3, 4, 5])).toBe(0);
	});

	it("matches trying every move on random schedules", () => {
		const random = createRandom(3440);
		for (let run = 0; run < 200; run++) {
			const eventTime = random.int(3, 15);
			const start: number[] = [];
			const end: number[] = [];
			for (let at = random.int(0, 2); at < eventTime; ) {
				const length = random.int(1, 3);
				if (at + length > eventTime) break;
				start.push(at);
				end.push(at + length);
				at += length + random.int(0, 3);
			}
			if (start.length === 0) continue;
			expect(maxFreeTime(eventTime, start, end)).toBe(
				byBruteForce(eventTime, start, end),
			);
		}
	});
});
