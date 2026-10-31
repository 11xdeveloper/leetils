import { describe, expect, it } from "bun:test";
import { minimumObstacleRemovalToReachCorner as minimumObstacles } from ".";

describe("2290. Minimum Obstacle Removal to Reach Corner", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumObstacles([
				[0, 1, 1],
				[1, 1, 0],
				[1, 1, 0],
			]),
		).toBe(2);
		expect(
			minimumObstacles([
				[0, 1, 0, 0, 0],
				[0, 1, 0, 1, 0],
				[0, 0, 0, 1, 0],
			]),
		).toBe(0);
	});
});
