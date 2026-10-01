import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { employeeFreeTime } from ".";

const toIntervals = (schedule: number[][][]) =>
	schedule.map((employee) =>
		employee.map(([start = 0, end = 0]) => ({ start, end })),
	);
const toPairs = (intervals: { start: number; end: number }[]) =>
	intervals.map(({ start, end }) => [start, end]);

describe("759. Employee Free Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			toPairs(
				employeeFreeTime(
					toIntervals([
						[
							[1, 2],
							[5, 6],
						],
						[[1, 3]],
						[[4, 10]],
					]),
				),
			),
		).toEqual([[3, 4]]);
		expect(
			toPairs(
				employeeFreeTime(
					toIntervals([
						[
							[1, 3],
							[6, 7],
						],
						[[2, 4]],
						[
							[2, 5],
							[9, 12],
						],
					]),
				),
			),
		).toEqual([
			[5, 6],
			[7, 9],
		]);
	});

	it("matches marking every busy unit of time on random schedules", () => {
		const random = createRandom(759);
		for (let run = 0; run < 500; run++) {
			const schedule = Array.from({ length: random.int(1, 4) }, () => {
				const intervals: number[][] = [];
				for (let t = random.int(0, 3); t < 25; ) {
					const end = t + random.int(1, 4);
					intervals.push([t, end]);
					t = end + random.int(1, 6);
				}
				return intervals.filter(([, end = 0]) => end <= 30);
			}).filter((employee) => employee.length > 0);
			if (schedule.length === 0) continue;
			// busy[t] covers the unit [t, t + 1).
			const busy = new Array<boolean>(31).fill(false);
			for (const [start = 0, end = 0] of schedule.flat())
				busy.fill(true, start, end);
			const first = busy.indexOf(true);
			const last = busy.lastIndexOf(true);
			const expected: number[][] = [];
			for (let t = first; t <= last; t++) {
				if (busy[t]) continue;
				const start = t;
				while (!busy[t]) t++;
				expected.push([start, t]);
			}
			expect(toPairs(employeeFreeTime(toIntervals(schedule)))).toEqual(
				expected,
			);
		}
	});
});
