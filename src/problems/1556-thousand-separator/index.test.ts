import { describe, expect, it } from "bun:test";
import { thousandSeparator } from ".";

describe("1556. Thousand Separator", () => {
	it("solves the examples from the problem statement", () => {
		expect(thousandSeparator(987)).toBe("987");
		expect(thousandSeparator(1234)).toBe("1.234");
	});

	it("handles zero, exact groups and the largest input", () => {
		expect(thousandSeparator(0)).toBe("0");
		expect(thousandSeparator(123456)).toBe("123.456");
		expect(thousandSeparator(2 ** 31 - 1)).toBe("2.147.483.647");
	});
});
