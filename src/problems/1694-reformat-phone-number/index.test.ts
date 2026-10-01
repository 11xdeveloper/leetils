import { describe, expect, it } from "bun:test";
import { reformatPhoneNumber as reformatNumber } from ".";

describe("1694. Reformat Phone Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(reformatNumber("1-23-45 6")).toBe("123-456");
		expect(reformatNumber("123 4-567")).toBe("123-45-67");
		expect(reformatNumber("123 4-5678")).toBe("123-456-78");
	});

	it("handles short numbers", () => {
		expect(reformatNumber("12")).toBe("12");
		expect(reformatNumber("1 2-3")).toBe("123");
		expect(reformatNumber("1234")).toBe("12-34");
	});
});
