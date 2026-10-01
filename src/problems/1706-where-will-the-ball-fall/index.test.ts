import { describe, expect, it } from "bun:test";
import { whereWillTheBallFall as findBall } from ".";

describe("1706. Where Will the Ball Fall", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findBall([
				[1, 1, 1, -1, -1],
				[1, 1, 1, -1, -1],
				[-1, -1, -1, 1, 1],
				[1, 1, 1, 1, -1],
				[-1, -1, -1, -1, -1],
			]),
		).toEqual([1, -1, -1, -1, -1]);
		expect(findBall([[-1]])).toEqual([-1]);
		expect(
			findBall([
				[1, 1, 1, 1, 1, 1],
				[-1, -1, -1, -1, -1, -1],
				[1, 1, 1, 1, 1, 1],
				[-1, -1, -1, -1, -1, -1],
			]),
		).toEqual([0, 1, 2, 3, 4, -1]);
	});
});
