import { describe, expect, it } from "bun:test";
import { constructTheRectangle as constructRectangle } from ".";

const byBruteForce = (area: number): number[] => {
	let best = [area, 1];
	for (let width = 1; width * width <= area; width++)
		if (area % width === 0) best = [area / width, width];
	return best;
};

describe("492. Construct the Rectangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(constructRectangle(4)).toEqual([2, 2]);
		expect(constructRectangle(37)).toEqual([37, 1]);
		expect(constructRectangle(122122)).toEqual([427, 286]);
	});

	it("matches trying every width for areas up to 5,000 and at the limit", () => {
		for (let area = 1; area <= 5000; area++)
			expect(constructRectangle(area)).toEqual(byBruteForce(area));
		expect(constructRectangle(10 ** 7)).toEqual([3200, 3125]);
	});
});
