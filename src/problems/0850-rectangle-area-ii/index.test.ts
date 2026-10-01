import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rectangleAreaII as rectangleArea } from ".";

describe("850. Rectangle Area II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			rectangleArea([
				[0, 0, 2, 2],
				[1, 0, 2, 3],
				[1, 0, 3, 1],
			]),
		).toBe(6);
		expect(rectangleArea([[0, 0, 1000000000, 1000000000]])).toBe(49);
	});

	it("matches marking every unit square on random rectangles", () => {
		const random = createRandom(850);
		for (let run = 0; run < 500; run++) {
			const rectangles = Array.from({ length: random.int(1, 6) }, () => {
				const [x1, y1] = [random.int(0, 9), random.int(0, 9)];
				return [x1, y1, random.int(x1 + 1, 10), random.int(y1 + 1, 10)];
			});
			const covered = new Set<string>();
			for (const [x1 = 0, y1 = 0, x2 = 0, y2 = 0] of rectangles) {
				for (let x = x1; x < x2; x++)
					for (let y = y1; y < y2; y++) covered.add(`${x},${y}`);
			}
			expect(rectangleArea(rectangles)).toBe(covered.size);
		}
	});
});
