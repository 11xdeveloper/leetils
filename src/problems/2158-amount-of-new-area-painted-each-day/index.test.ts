import { describe, expect, it } from "bun:test";
import { amountOfNewAreaPaintedEachDay as amountPainted } from ".";

describe("2158. Amount of New Area Painted Each Day", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			amountPainted([
				[1, 4],
				[4, 7],
				[5, 8],
			]),
		).toEqual([3, 3, 1]);
		expect(
			amountPainted([
				[1, 4],
				[5, 8],
				[4, 7],
			]),
		).toEqual([3, 3, 1]);
		expect(
			amountPainted([
				[1, 5],
				[2, 4],
			]),
		).toEqual([4, 0]);
	});

	it("fills gaps between painted stretches", () => {
		expect(
			amountPainted([
				[0, 2],
				[4, 6],
				[0, 10],
			]),
		).toEqual([2, 2, 6]);
	});
});
