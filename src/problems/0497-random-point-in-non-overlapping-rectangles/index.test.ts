import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RandomPointInNonOverlappingRectangles } from ".";

describe("497. Random Point in Non-overlapping Rectangles", () => {
	it("picks every covered point with equal probability", () => {
		const rects = [
			[-2, -2, 1, 1],
			[2, 2, 4, 6],
			[5, 0, 5, 0],
		];
		const points = new Set<string>();
		for (const [x1 = 0, y1 = 0, x2 = 0, y2 = 0] of rects) {
			for (let x = x1; x <= x2; x++)
				for (let y = y1; y <= y2; y++) points.add(`${x},${y}`);
		}

		const picker = new RandomPointInNonOverlappingRectangles(
			rects,
			createRandom(497).next,
		);
		const counts = new Map<string, number>();
		const samples = 100_000;
		for (let i = 0; i < samples; i++) {
			const key = picker.pick().join();
			expect(points.has(key)).toBeTrue();
			counts.set(key, (counts.get(key) ?? 0) + 1);
		}

		expect(counts.size).toBe(points.size);
		const expected = samples / points.size;
		for (const count of counts.values())
			expect(Math.abs(count - expected)).toBeLessThan(expected * 0.15);
	});

	it("maps the lowest and highest random numbers to the first and last points", () => {
		const rects = [
			[0, 0, 1, 1],
			[10, 10, 12, 10],
		];
		expect(
			new RandomPointInNonOverlappingRectangles(rects, () => 0).pick(),
		).toEqual([0, 0]);
		expect(
			new RandomPointInNonOverlappingRectangles(rects, () => 0.9999999).pick(),
		).toEqual([12, 10]);
	});
});
