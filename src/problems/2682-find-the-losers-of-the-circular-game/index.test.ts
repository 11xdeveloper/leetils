import { describe, expect, it } from "bun:test";
import { findTheLosersOfTheCircularGame as circularGameLosers } from ".";

describe("2682. Find the Losers of the Circular Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(circularGameLosers(5, 2)).toEqual([4, 5]);
		expect(circularGameLosers(4, 4)).toEqual([2, 3, 4]);
	});
});
