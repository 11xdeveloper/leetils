import { describe, expect, it } from "bun:test";
import { findChampionI as findChampion } from ".";

describe("2923. Find Champion I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findChampion([
				[0, 1],
				[0, 0],
			]),
		).toBe(0);
		expect(
			findChampion([
				[0, 0, 1],
				[1, 0, 1],
				[0, 0, 0],
			]),
		).toBe(1);
	});
});
