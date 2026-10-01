import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { convexPolygon as isConvex } from ".";

/** The vertices of a convex polygon inscribed in a circle, anticlockwise. */
const randomConvexPolygon = (random: Random): number[][] => {
	const n = random.int(6, 12);
	return Array.from({ length: n }, (_, i) => {
		const angle = ((i + random.next() * 0.3) * 2 * Math.PI) / n;
		return [
			Math.round(1000 * Math.cos(angle)),
			Math.round(1000 * Math.sin(angle)),
		];
	});
};

describe("469. Convex Polygon", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isConvex([
				[0, 0],
				[0, 5],
				[5, 5],
				[5, 0],
			]),
		).toBeTrue();
		expect(
			isConvex([
				[0, 0],
				[0, 10],
				[10, 10],
				[10, 0],
				[5, 5],
			]),
		).toBeFalse();
	});

	it("ignores vertices in the middle of a straight edge", () => {
		expect(
			isConvex([
				[0, 0],
				[1, 0],
				[2, 0],
				[2, 2],
				[0, 2],
			]),
		).toBeTrue();
		expect(
			isConvex([
				[0, 0],
				[1, 0],
				[2, 0],
				[1, 1],
				[2, 2],
				[0, 2],
			]),
		).toBeFalse();
	});

	it("accepts random convex polygons in either direction", () => {
		const random = createRandom(469);
		for (let run = 0; run < 300; run++) {
			const polygon = randomConvexPolygon(random);
			expect(isConvex(polygon)).toBeTrue();
			expect(isConvex(polygon.toReversed())).toBeTrue();
		}
	});

	it("rejects random polygons with one vertex pulled into the centre", () => {
		const random = createRandom(4690);
		for (let run = 0; run < 300; run++) {
			const polygon = randomConvexPolygon(random);
			polygon[random.int(0, polygon.length - 1)] = [0, 0];
			expect(isConvex(polygon)).toBeFalse();
			expect(isConvex(polygon.toReversed())).toBeFalse();
		}
	});
});
