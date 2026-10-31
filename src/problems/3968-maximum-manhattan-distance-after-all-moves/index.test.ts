import { describe, expect, it } from "bun:test";
import { maximumManhattanDistanceAfterAllMoves as maxDistance } from ".";

describe("3968. Maximum Manhattan Distance After All Moves", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistance("L_D_")).toBe(4);
		expect(maxDistance("U_R")).toBe(3);
	});
});
