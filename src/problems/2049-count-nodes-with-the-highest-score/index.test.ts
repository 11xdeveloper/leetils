import { describe, expect, it } from "bun:test";
import { countNodesWithTheHighestScore as highestScoreNodes } from ".";

describe("2049. Count Nodes With the Highest Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(highestScoreNodes([-1, 2, 0, 2, 0])).toBe(3);
		expect(highestScoreNodes([-1, 2, 0])).toBe(2);
	});

	it("scores a path and a star", () => {
		// Path 0-1-2-3-4: both ends and the middle score 4.
		expect(highestScoreNodes([-1, 0, 1, 2, 3])).toBe(3);
		// Star: removing the centre leaves single nodes, scoring 1.
		expect(highestScoreNodes([-1, 0, 0, 0])).toBe(3);
	});
});
