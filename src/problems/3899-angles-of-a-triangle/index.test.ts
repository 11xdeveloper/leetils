import { describe, expect, it } from "bun:test";
import { anglesOfATriangle as internalAngles } from ".";

describe("3899. Angles of a Triangle", () => {
	it("solves the examples from the problem statement", () => {
		const angles = internalAngles([3, 4, 5]);
		[36.8699, 53.1301, 90].forEach((expected, i) => {
			expect(angles[i] ?? 0).toBeCloseTo(expected, 4);
		});
		expect(internalAngles([2, 4, 2])).toEqual([]);
	});

	it("sums to 180 degrees", () => {
		expect(internalAngles([7, 8, 9]).reduce((a, b) => a + b, 0)).toBeCloseTo(
			180,
			8,
		);
	});
});
