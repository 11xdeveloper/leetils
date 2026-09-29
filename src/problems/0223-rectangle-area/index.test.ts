import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rectangleArea } from ".";

/** Counts the covered unit squares. */
const byCounting = (a: number[], b: number[]): number => {
	const covered = new Set<string>();
	for (const [x1 = 0, y1 = 0, x2 = 0, y2 = 0] of [a, b]) {
		for (let x = x1; x < x2; x++)
			for (let y = y1; y < y2; y++) covered.add(`${x},${y}`);
	}
	return covered.size;
};

describe("223. Rectangle Area", () => {
	it("solves the examples from the problem statement", () => {
		expect(rectangleArea(-3, 0, 3, 4, 0, -1, 9, 2)).toBe(45);
		expect(rectangleArea(-2, -2, 2, 2, -2, -2, 2, 2)).toBe(16);
	});

	it("handles rectangles that don't overlap or only touch", () => {
		expect(rectangleArea(0, 0, 1, 1, 2, 2, 3, 3)).toBe(2);
		expect(rectangleArea(0, 0, 1, 1, 1, 0, 2, 1)).toBe(2);
	});

	it("handles one rectangle inside the other", () => {
		expect(rectangleArea(0, 0, 10, 10, 2, 2, 3, 3)).toBe(100);
	});

	it("handles coordinates at the limits of the constraints", () => {
		expect(rectangleArea(-1e4, -1e4, 1e4, 1e4, -1e4, -1e4, 1e4, 1e4)).toBe(4e8);
	});

	it("matches counting covered squares on random rectangles", () => {
		const random = createRandom(223);
		const rectangle = (): [number, number, number, number] => {
			const x1 = random.int(-5, 5);
			const y1 = random.int(-5, 5);
			return [x1, y1, x1 + random.int(0, 5), y1 + random.int(0, 5)];
		};
		for (let run = 0; run < 1000; run++) {
			const a = rectangle();
			const b = rectangle();
			expect(rectangleArea(...a, ...b)).toBe(byCounting(a, b));
		}
	});
});
