import { describe, expect, it } from "bun:test";
import { toBeOrNotToBe } from ".";

describe("2704. To Be Or Not To Be", () => {
	it("solves the examples from the problem statement", () => {
		expect(toBeOrNotToBe(5).toBe(5)).toBeTrue();
		expect(() => toBeOrNotToBe(5).toBe(null)).toThrow("Not Equal");
		expect(toBeOrNotToBe(5).notToBe(null)).toBeTrue();
		expect(() => toBeOrNotToBe(5).notToBe(5)).toThrow("Equal");
	});

	it("compares objects by identity", () => {
		const o = {};
		expect(toBeOrNotToBe(o).toBe(o)).toBeTrue();
		expect(toBeOrNotToBe(o).notToBe({})).toBeTrue();
	});
});
