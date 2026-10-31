import { describe, expect, it } from "bun:test";
import { arrayOfObjectsToMatrix } from ".";

describe("2675. Array of Objects to Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			arrayOfObjectsToMatrix([
				{ b: 1, a: 2 },
				{ b: 3, a: 4 },
			]),
		).toEqual([
			["a", "b"],
			[2, 1],
			[4, 3],
		]);
		expect(
			arrayOfObjectsToMatrix([{ a: 1, b: 2 }, { c: 3, d: 4 }, {}]),
		).toEqual([
			["a", "b", "c", "d"],
			[1, 2, "", ""],
			["", "", 3, 4],
			["", "", "", ""],
		]);
		expect(
			arrayOfObjectsToMatrix([{ a: { b: 1, c: 2 } }, { a: { b: 3, d: 4 } }]),
		).toEqual([
			["a.b", "a.c", "a.d"],
			[1, 2, ""],
			[3, "", 4],
		]);
		expect(
			arrayOfObjectsToMatrix([[{ a: null }], [{ b: true }], [{ c: "x" }]]),
		).toEqual([
			["0.a", "0.b", "0.c"],
			[null, "", ""],
			["", true, ""],
			["", "", "x"],
		]);
		expect(arrayOfObjectsToMatrix([{}, {}, {}])).toEqual([[], [], [], []]);
	});

	it("keeps falsy values and sorts keys as strings", () => {
		expect(arrayOfObjectsToMatrix([{ b: 0, a10: false, a2: "" }])).toEqual([
			["a10", "a2", "b"],
			[false, "", 0],
		]);
	});
});
