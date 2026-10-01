import { describe, expect, it } from "bun:test";
import { checkIfItIsAStraightLine as checkStraightLine } from ".";

describe("1232. Check If It Is a Straight Line", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkStraightLine([
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5],
				[5, 6],
				[6, 7],
			]),
		).toBeTrue();
		expect(
			checkStraightLine([
				[1, 1],
				[2, 2],
				[3, 4],
				[4, 5],
				[5, 6],
				[7, 7],
			]),
		).toBeFalse();
	});

	it("handles vertical and horizontal lines", () => {
		expect(
			checkStraightLine([
				[0, 0],
				[0, 1],
				[0, -1],
			]),
		).toBeTrue();
		expect(
			checkStraightLine([
				[0, 0],
				[5, 0],
				[-3, 0],
			]),
		).toBeTrue();
		expect(
			checkStraightLine([
				[0, 0],
				[0, 1],
				[1, 1],
			]),
		).toBeFalse();
	});

	it("accepts any two points", () => {
		expect(
			checkStraightLine([
				[3, -7],
				[10000, 9999],
			]),
		).toBeTrue();
	});
});
