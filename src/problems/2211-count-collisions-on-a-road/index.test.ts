import { describe, expect, it } from "bun:test";
import { countCollisionsOnARoad as countCollisions } from ".";

describe("2211. Count Collisions on a Road", () => {
	it("solves the examples from the problem statement", () => {
		expect(countCollisions("RLRSLL")).toBe(5);
		expect(countCollisions("LLRR")).toBe(0);
	});
});
