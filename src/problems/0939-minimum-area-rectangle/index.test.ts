import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAreaRectangle as minAreaRect } from ".";

describe("939. Minimum Area Rectangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minAreaRect([
				[1, 1],
				[1, 3],
				[3, 1],
				[3, 3],
				[2, 2],
			]),
		).toBe(4);
		expect(
			minAreaRect([
				[1, 1],
				[1, 3],
				[3, 1],
				[3, 3],
				[4, 1],
				[4, 3],
			]),
		).toBe(2);
	});

	it("matches trying every pair of x and y coordinates on random points", () => {
		const random = createRandom(939);
		for (let run = 0; run < 500; run++) {
			const unique = new Map<string, number[]>();
			for (let i = random.int(1, 15); i > 0; i--) {
				const point = [random.int(0, 5), random.int(0, 5)];
				unique.set(point.join(), point);
			}
			const points = [...unique.values()];
			let expected = Number.POSITIVE_INFINITY;
			for (let x1 = 0; x1 <= 5; x1++) {
				for (let x2 = x1 + 1; x2 <= 5; x2++) {
					for (let y1 = 0; y1 <= 5; y1++) {
						for (let y2 = y1 + 1; y2 <= 5; y2++) {
							if (
								[
									[x1, y1],
									[x1, y2],
									[x2, y1],
									[x2, y2],
								].every((corner) => unique.has(corner.join()))
							)
								expected = Math.min(expected, (x2 - x1) * (y2 - y1));
						}
					}
				}
			}
			expect(minAreaRect(points)).toBe(
				expected === Number.POSITIVE_INFINITY ? 0 : expected,
			);
		}
	});
});
