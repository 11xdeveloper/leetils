import { describe, expect, it } from "bun:test";
import { movePiecesToObtainAString as canChange } from ".";

describe("2337. Move Pieces to Obtain a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(canChange("_L__R__R_", "L______RR")).toBeTrue();
		expect(canChange("R_L_", "__LR")).toBeFalse();
		expect(canChange("_R", "R_")).toBeFalse();
	});
});
