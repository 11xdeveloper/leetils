import { describe, expect, it } from "bun:test";
import { maximumManhattanDistanceAfterKChanges as maxDistance } from ".";

describe("3443. Maximum Manhattan Distance After K Changes", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistance("NWSE", 1)).toBe(3);
		expect(maxDistance("NSWWEW", 3)).toBe(6);
	});
});
