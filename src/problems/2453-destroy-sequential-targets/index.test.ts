import { describe, expect, it } from "bun:test";
import { destroySequentialTargets as destroyTargets } from ".";

describe("2453. Destroy Sequential Targets", () => {
	it("solves the examples from the problem statement", () => {
		expect(destroyTargets([3, 7, 8, 1, 1, 5], 2)).toBe(1);
		expect(destroyTargets([1, 3, 5, 2, 4, 6], 2)).toBe(1);
		expect(destroyTargets([6, 2, 5], 100)).toBe(2);
	});
});
