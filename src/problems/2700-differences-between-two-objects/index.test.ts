import { describe, expect, it } from "bun:test";
import { differencesBetweenTwoObjects } from ".";

describe("2700. Differences Between Two Objects", () => {
	it("solves the examples from the problem statement", () => {
		expect(differencesBetweenTwoObjects({}, { a: 1, b: 2 })).toEqual({});
		expect(
			differencesBetweenTwoObjects(
				{ a: 1, v: 3, x: [], z: { a: null } },
				{
					a: 2,
					v: 4,
					x: [],
					z: { a: 2 },
				},
			),
		).toEqual({ a: [1, 2], v: [3, 4], z: { a: [null, 2] } });
		expect(
			differencesBetweenTwoObjects(
				{ a: 5, v: 6, z: [1, 2, 4, [2, 5, 7]] },
				{
					a: 5,
					v: 7,
					z: [1, 2, 3, [1]],
				},
			),
		).toEqual({ v: [6, 7], z: { 2: [4, 3], 3: { 0: [2, 1] } } });
		expect(differencesBetweenTwoObjects({ a: { b: 1 } }, { a: [5] })).toEqual({
			a: [{ b: 1 }, [5]],
		});
		expect(
			differencesBetweenTwoObjects(
				{ a: [1, 2, {}], b: false },
				{
					b: false,
					a: [1, 2, {}],
				},
			),
		).toEqual({});
	});
});
