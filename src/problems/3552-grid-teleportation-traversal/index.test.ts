import { describe, expect, it } from "bun:test";
import { gridTeleportationTraversal as minMoves } from ".";

describe("3552. Grid Teleportation Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves(["A..", ".A.", "..."])).toBe(2);
		expect(minMoves([".#...", ".#.#.", ".#.#.", "...#."])).toBe(13);
		expect(minMoves(["A"])).toBe(0);
	});

	it("handles unreachable ends", () => {
		expect(minMoves([".#", "#."])).toBe(-1);
	});
});
