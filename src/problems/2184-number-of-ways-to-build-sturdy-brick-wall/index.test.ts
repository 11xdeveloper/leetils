import { describe, expect, it } from "bun:test";
import { numberOfWaysToBuildSturdyBrickWall as buildWall } from ".";

describe("2184. Number of Ways to Build Sturdy Brick Wall", () => {
	it("solves the examples from the problem statement", () => {
		expect(buildWall(2, 3, [1, 2])).toBe(2);
		expect(buildWall(1, 1, [5])).toBe(0);
	});

	it("counts single rows and wider walls", () => {
		// Rows of width 4 from 1s and 2s: 1111, 112, 121, 211, 22.
		expect(buildWall(1, 4, [1, 2])).toBe(5);
		// Joints 2 (22) only pair with joints {1, 3} (121), and vice versa.
		expect(buildWall(3, 4, [1, 2])).toBe(2);
	});
});
