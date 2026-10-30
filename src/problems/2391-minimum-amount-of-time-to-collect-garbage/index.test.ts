import { describe, expect, it } from "bun:test";
import { minimumAmountOfTimeToCollectGarbage as garbageCollection } from ".";

describe("2391. Minimum Amount of Time to Collect Garbage", () => {
	it("solves the examples from the problem statement", () => {
		expect(garbageCollection(["G", "P", "GP", "GG"], [2, 4, 3])).toBe(21);
		expect(garbageCollection(["MMM", "PGM", "GP"], [3, 10])).toBe(37);
	});
});
