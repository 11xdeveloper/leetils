import { describe, expect, it } from "bun:test";
import { stringToIntegerAtoi } from ".";

describe("8. String to Integer (atoi)", () => {
	it("solves the examples from the problem statement", () => {
		expect(stringToIntegerAtoi("42")).toBe(42);
		expect(stringToIntegerAtoi(" -042")).toBe(-42);
		expect(stringToIntegerAtoi("1337c0d3")).toBe(1337);
		expect(stringToIntegerAtoi("0-1")).toBe(0);
		expect(stringToIntegerAtoi("words and 987")).toBe(0);
	});

	it("skips leading spaces and reads an optional sign", () => {
		expect(stringToIntegerAtoi("   +1")).toBe(1);
		expect(stringToIntegerAtoi("   -1   ")).toBe(-1);
		expect(stringToIntegerAtoi("+000123")).toBe(123);
		expect(stringToIntegerAtoi("-000123")).toBe(-123);
	});

	it("returns 0 when there are no digits", () => {
		expect(stringToIntegerAtoi("")).toBe(0);
		expect(stringToIntegerAtoi("     ")).toBe(0);
		expect(stringToIntegerAtoi("+")).toBe(0);
		expect(stringToIntegerAtoi("-")).toBe(0);
		expect(stringToIntegerAtoi("+-12")).toBe(0);
		expect(stringToIntegerAtoi("  +  413")).toBe(0);
		expect(stringToIntegerAtoi(".1")).toBe(0);
	});

	it("never returns -0", () => {
		expect(stringToIntegerAtoi("-0")).toBe(0);
		expect(stringToIntegerAtoi("-000")).toBe(0);
	});

	it("stops at the first non-digit", () => {
		expect(stringToIntegerAtoi("3.14159")).toBe(3);
		expect(stringToIntegerAtoi("-3.14159")).toBe(-3);
		expect(stringToIntegerAtoi("1e5")).toBe(1);
		expect(stringToIntegerAtoi("0x1A")).toBe(0);
		expect(stringToIntegerAtoi("00-42a1234")).toBe(0);
	});

	it("keeps values at the 32-bit limits", () => {
		expect(stringToIntegerAtoi("2147483647")).toBe(2147483647);
		expect(stringToIntegerAtoi("-2147483648")).toBe(-2147483648);
	});

	it("clamps values outside the 32-bit range", () => {
		expect(stringToIntegerAtoi("2147483648")).toBe(2147483647);
		expect(stringToIntegerAtoi("-2147483649")).toBe(-2147483648);
		expect(stringToIntegerAtoi("9999999999")).toBe(2147483647);
		expect(stringToIntegerAtoi("-91283472332")).toBe(-2147483648);
		expect(stringToIntegerAtoi(`1${"0".repeat(200)}`)).toBe(2147483647);
	});

	it("handles many leading zeros", () => {
		expect(stringToIntegerAtoi("00000000000012345678")).toBe(12345678);
	});
});
