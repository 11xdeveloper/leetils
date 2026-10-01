import { describe, expect, it } from "bun:test";
import { longPressedName as isLongPressedName } from ".";

describe("925. Long Pressed Name", () => {
	it("solves the examples from the problem statement", () => {
		expect(isLongPressedName("alex", "aaleex")).toBeTrue();
		expect(isLongPressedName("saeed", "ssaaedd")).toBeFalse();
	});

	it("rejects extra or missing letters", () => {
		expect(isLongPressedName("alex", "aaleexa")).toBeFalse();
		expect(isLongPressedName("alex", "alx")).toBeFalse();
		expect(isLongPressedName("aa", "aaa")).toBeTrue();
	});
});
