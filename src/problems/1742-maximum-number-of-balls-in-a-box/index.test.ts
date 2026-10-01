import { describe, expect, it } from "bun:test";
import { maximumNumberOfBallsInABox as countBalls } from ".";

describe("1742. Maximum Number of Balls in a Box", () => {
	it("solves the examples from the problem statement", () => {
		expect(countBalls(1, 10)).toBe(2);
		expect(countBalls(5, 15)).toBe(2);
		expect(countBalls(19, 28)).toBe(2);
	});

	it("handles a single ball", () => {
		expect(countBalls(7, 7)).toBe(1);
	});
});
