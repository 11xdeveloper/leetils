import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { circleAndRectangleOverlapping as checkOverlap } from ".";

/**
 * With integer inputs the rectangle's closest point to the centre has
 * integer coordinates, so checking every lattice point in it is exact.
 */
const byBruteForce = (
	r: number,
	xc: number,
	yc: number,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
) => {
	for (let x = x1; x <= x2; x++) {
		for (let y = y1; y <= y2; y++)
			if ((x - xc) ** 2 + (y - yc) ** 2 <= r * r) return true;
	}
	return false;
};

describe("1401. Circle and Rectangle Overlapping", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkOverlap(1, 0, 0, 1, -1, 3, 1)).toBeTrue();
		expect(checkOverlap(1, 1, 1, 1, -3, 2, -1)).toBeFalse();
		expect(checkOverlap(1, 0, 0, -1, 0, 0, 1)).toBeTrue();
	});

	it("counts touching at a corner and a circle inside the rectangle", () => {
		expect(checkOverlap(5, 0, 0, 3, 4, 10, 10)).toBeTrue();
		expect(checkOverlap(4, 0, 0, 3, 3, 10, 10)).toBeFalse();
		expect(checkOverlap(1, 5, 5, 0, 0, 10, 10)).toBeTrue();
	});

	it("matches checking lattice points on random inputs", () => {
		const random = createRandom(1401);
		for (let run = 0; run < 500; run++) {
			const [r, xc, yc] = [
				random.int(1, 5),
				random.int(-8, 8),
				random.int(-8, 8),
			];
			const [x1, y1] = [random.int(-8, 7), random.int(-8, 7)];
			const [x2, y2] = [random.int(x1 + 1, 8), random.int(y1 + 1, 8)];
			expect(checkOverlap(r, xc, yc, x1, y1, x2, y2)).toBe(
				byBruteForce(r, xc, yc, x1, y1, x2, y2),
			);
		}
	});
});
