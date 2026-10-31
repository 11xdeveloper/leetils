import { describe, expect, it } from "bun:test";
import { removeLetterToEqualizeFrequency as equalFrequency } from ".";

describe("2423. Remove Letter To Equalize Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(equalFrequency("abcc")).toBeTrue();
		expect(equalFrequency("aazz")).toBeFalse();
	});

	it("can remove a letter entirely", () => {
		expect(equalFrequency("abbcc")).toBeTrue();
		expect(equalFrequency("zz")).toBeTrue();
	});
});
