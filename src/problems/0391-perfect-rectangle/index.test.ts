import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { perfectRectangle } from ".";

/** Counts coverage of every unit square in the bounding box. */
const byUnitSquares = (rectangles: number[][]): boolean => {
	const coverage = new Map<string, number>();
	for (const [x1 = 0, y1 = 0, x2 = 0, y2 = 0] of rectangles) {
		for (let x = x1; x < x2; x++) {
			for (let y = y1; y < y2; y++)
				coverage.set(`${x},${y}`, (coverage.get(`${x},${y}`) ?? 0) + 1);
		}
	}
	const xs = rectangles.flatMap(([x1 = 0, , x2 = 0]) => [x1, x2]);
	const ys = rectangles.flatMap(([, y1 = 0, , y2 = 0]) => [y1, y2]);
	for (let x = Math.min(...xs); x < Math.max(...xs); x++) {
		for (let y = Math.min(...ys); y < Math.max(...ys); y++)
			if (coverage.get(`${x},${y}`) !== 1) return false;
	}
	return true;
};

describe("391. Perfect Rectangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			perfectRectangle([
				[1, 1, 3, 3],
				[3, 1, 4, 2],
				[3, 2, 4, 4],
				[1, 3, 2, 4],
				[2, 3, 3, 4],
			]),
		).toBeTrue();
		expect(
			perfectRectangle([
				[1, 1, 2, 3],
				[1, 3, 2, 4],
				[3, 1, 4, 2],
				[3, 2, 4, 4],
			]),
		).toBeFalse();
		expect(
			perfectRectangle([
				[1, 1, 3, 3],
				[3, 1, 4, 2],
				[1, 3, 2, 4],
				[2, 2, 4, 4],
			]),
		).toBeFalse();
	});

	it("catches overlaps that happen to have the right total area", () => {
		expect(
			perfectRectangle([
				[0, 0, 1, 1],
				[0, 0, 1, 1],
				[1, 1, 2, 2],
				[1, 1, 2, 2],
			]),
		).toBeFalse();
	});

	it("matches counting unit squares on random rectangles", () => {
		const random = createRandom(391);
		for (let run = 0; run < 2000; run++) {
			let rectangles: number[][];
			if (random.int(0, 1) === 0) {
				// Cut a random grid of cells into rectangles, then maybe nudge one.
				const [width, height] = [random.int(1, 4), random.int(1, 4)];
				rectangles = [];
				for (let x = 0; x < width; x++)
					for (let y = 0; y < height; y++)
						rectangles.push([x, y, x + 1, y + 1]);
				if (rectangles.length > 1 && random.int(0, 1) === 0) rectangles.pop();
				if (random.int(0, 1) === 0 && rectangles.length > 0)
					rectangles.push(rectangles[0] ?? [0, 0, 1, 1]);
			} else {
				rectangles = Array.from({ length: random.int(1, 4) }, () => {
					const [x, y] = [random.int(0, 3), random.int(0, 3)];
					return [x, y, x + random.int(1, 2), y + random.int(1, 2)];
				});
			}
			expect(perfectRectangle(rectangles)).toBe(byUnitSquares(rectangles));
		}
	});
});
