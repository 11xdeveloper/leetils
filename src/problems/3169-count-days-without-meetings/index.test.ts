import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countDaysWithoutMeetings as countDays } from ".";

describe("3169. Count Days Without Meetings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countDays(10, [
				[5, 7],
				[1, 3],
				[9, 10],
			]),
		).toBe(2);
		expect(
			countDays(5, [
				[2, 4],
				[1, 3],
			]),
		).toBe(1);
		expect(countDays(6, [[1, 6]])).toBe(0);
	});

	it("matches marking days on random meetings", () => {
		const random = createRandom(3169);
		for (let run = 0; run < 300; run++) {
			const days = random.int(1, 20);
			const meetings = Array.from({ length: random.int(1, 5) }, () => {
				const start = random.int(1, days);
				return [start, random.int(start, days)];
			});
			const busy = new Set<number>();
			for (const [s = 0, e = 0] of meetings)
				for (let d = s; d <= e; d++) busy.add(d);
			expect(countDays(days, meetings)).toBe(days - busy.size);
		}
	});
});
