import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { meetingScheduler as minAvailableDuration } from ".";

/** Tries every start time in order. */
const byBruteForce = (
	slots1: number[][],
	slots2: number[][],
	duration: number,
): number[] => {
	const fits = (slots: number[][], start: number) =>
		slots.some(([s = 0, e = 0]) => s <= start && start + duration <= e);
	for (let start = 0; start <= 100; start++) {
		if (fits(slots1, start) && fits(slots2, start))
			return [start, start + duration];
	}
	return [];
};

/** Up to four non-overlapping slots within [0, 100], shuffled. */
const randomSlots = (random: Random): number[][] => {
	const points = [...new Set(random.array(8, 0, 100))].sort((a, b) => a - b);
	const slots: number[][] = [];
	for (let i = 0; i + 1 < points.length; i += 2)
		slots.push([points[i] ?? 0, points[i + 1] ?? 0]);
	return slots.sort(() => random.next() - 0.5);
};

describe("1229. Meeting Scheduler", () => {
	it("solves the examples from the problem statement", () => {
		const slots1 = [
			[10, 50],
			[60, 120],
			[140, 210],
		];
		const slots2 = [
			[0, 15],
			[60, 70],
		];
		expect(minAvailableDuration(slots1, slots2, 8)).toEqual([60, 68]);
		expect(minAvailableDuration(slots1, slots2, 12)).toEqual([]);
	});

	it("matches trying every start time on random slots", () => {
		const random = createRandom(1229);
		for (let run = 0; run < 300; run++) {
			const [slots1, slots2] = [randomSlots(random), randomSlots(random)];
			if (slots1.length === 0 || slots2.length === 0) continue;
			const duration = random.int(1, 30);
			expect(minAvailableDuration(slots1, slots2, duration)).toEqual(
				byBruteForce(slots1, slots2, duration),
			);
		}
	});
});
