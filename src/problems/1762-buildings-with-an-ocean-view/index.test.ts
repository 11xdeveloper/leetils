import { describe, expect, it } from "bun:test";
import { buildingsWithAnOceanView as findBuildings } from ".";

describe("1762. Buildings With an Ocean View", () => {
	it("solves the examples from the problem statement", () => {
		expect(findBuildings([4, 2, 3, 1])).toEqual([0, 2, 3]);
		expect(findBuildings([4, 3, 2, 1])).toEqual([0, 1, 2, 3]);
		expect(findBuildings([1, 3, 2, 4])).toEqual([3]);
	});

	it("blocks the view with an equally tall building", () => {
		expect(findBuildings([2, 2, 2])).toEqual([2]);
	});
});
