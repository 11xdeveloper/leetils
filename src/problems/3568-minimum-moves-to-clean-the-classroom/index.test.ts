import { describe, expect, it } from "bun:test";
import { minimumMovesToCleanTheClassroom as minMoves } from ".";

describe("3568. Minimum Moves to Clean the Classroom", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves(["S.", "XL"], 2)).toBe(2);
		expect(minMoves(["LS", "RL"], 4)).toBe(3);
		expect(minMoves(["L.S", "RXL"], 3)).toBe(-1);
	});

	it("needs no moves without litter", () => {
		expect(minMoves(["S"], 0)).toBe(0);
	});
});
