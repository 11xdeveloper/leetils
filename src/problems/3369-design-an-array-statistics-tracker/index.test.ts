import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignAnArrayStatisticsTracker as StatisticsTracker } from ".";

describe("3369. Design an Array Statistics Tracker", () => {
	it("solves the examples from the problem statement", () => {
		const a = new StatisticsTracker();
		for (const x of [4, 4, 2, 3]) a.addNumber(x);
		expect([a.getMean(), a.getMedian(), a.getMode()]).toEqual([3, 4, 4]);
		a.removeFirstAddedNumber();
		expect(a.getMode()).toBe(2);

		const b = new StatisticsTracker();
		for (const x of [9, 5]) b.addNumber(x);
		expect(b.getMean()).toBe(7);
		b.removeFirstAddedNumber();
		b.addNumber(5);
		b.addNumber(6);
		b.removeFirstAddedNumber();
		expect([b.getMedian(), b.addNumber(8), b.getMode()]).toEqual([
			6,
			undefined,
			5,
		]);
	});

	it("matches recomputing on random operations", () => {
		const random = createRandom(3369);
		for (let run = 0; run < 100; run++) {
			const tracker = new StatisticsTracker();
			const values: number[] = [];
			for (let step = 0; step < 40; step++) {
				if (values.length > 0 && random.int(0, 2) === 0) {
					tracker.removeFirstAddedNumber();
					values.shift();
				} else {
					const x = random.int(1, 6);
					tracker.addNumber(x);
					values.push(x);
				}
				if (values.length === 0) continue;
				const sorted = values.toSorted((p, q) => p - q);
				const counts = new Map<number, number>();
				for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
				const most = Math.max(...counts.values());
				expect(tracker.getMean()).toBe(
					Math.floor(values.reduce((p, q) => p + q, 0) / values.length),
				);
				expect(tracker.getMedian()).toBe(
					sorted[Math.floor(sorted.length / 2)] ?? 0,
				);
				expect(tracker.getMode()).toBe(
					Math.min(
						...[...counts].filter(([, c]) => c === most).map(([v]) => v),
					),
				);
			}
		}
	});
});
