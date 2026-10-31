import { describe, expect, it } from "bun:test";
import { findChampionII as findChampion } from ".";

describe("2924. Find Champion II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findChampion(3, [
				[0, 1],
				[1, 2],
			]),
		).toBe(0);
		expect(
			findChampion(4, [
				[0, 2],
				[1, 3],
				[1, 2],
			]),
		).toBe(-1);
	});
});
