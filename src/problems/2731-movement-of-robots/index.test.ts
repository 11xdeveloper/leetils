import { describe, expect, it } from "bun:test";
import { movementOfRobots as sumDistance } from ".";

describe("2731. Movement of Robots", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumDistance([-2, 0, 2], "RLL", 3)).toBe(8);
		expect(sumDistance([1, 0], "RL", 2)).toBe(5);
	});
});
