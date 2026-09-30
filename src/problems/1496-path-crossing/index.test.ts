import { describe, expect, it } from "bun:test";
import { pathCrossing as isPathCrossing } from ".";

describe("1496. Path Crossing", () => {
	it("solves the examples from the problem statement", () => {
		expect(isPathCrossing("NES")).toBeFalse();
		expect(isPathCrossing("NESWW")).toBeTrue();
	});

	it("counts returning to the origin", () => {
		expect(isPathCrossing("NS")).toBeTrue();
		expect(isPathCrossing("NNNN")).toBeFalse();
	});
});
