import { describe, expect, it } from "bun:test";
import { equalRationalNumbers as isRationalEqual } from ".";

describe("972. Equal Rational Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(isRationalEqual("0.(52)", "0.5(25)")).toBeTrue();
		expect(isRationalEqual("0.1666(6)", "0.166(66)")).toBeTrue();
		expect(isRationalEqual("0.9(9)", "1.")).toBeTrue();
	});

	it("handles plain integers, trailing points and different values", () => {
		expect(isRationalEqual("1", "1.0")).toBeTrue();
		expect(isRationalEqual("1.", "0.(9)")).toBeTrue();
		expect(isRationalEqual("0.(3)", "0.3")).toBeFalse();
		expect(isRationalEqual("12.34(56)", "12.3456(56)")).toBeTrue();
		expect(isRationalEqual("12.34(56)", "12.345(65)")).toBeTrue();
		expect(isRationalEqual("12.34(56)", "12.34(57)")).toBeFalse();
	});
});
