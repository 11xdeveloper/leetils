import { describe, expect, it } from "bun:test";
import { myAtoi } from "./index";

describe("myAtoi", () => {
	it("should convert basic number strings", () => {
		expect(myAtoi("42")).toBe(42);
		expect(myAtoi("   -42")).toBe(-42);
		expect(myAtoi("4193 with words")).toBe(4193);
	});

	it("should handle whitespace", () => {
		expect(myAtoi("     ")).toBe(0);
		expect(myAtoi("   +1")).toBe(1);
		expect(myAtoi("   -1   ")).toBe(-1);
	});

	it("should handle invalid inputs", () => {
		expect(myAtoi("words and 987")).toBe(0);
		expect(myAtoi("+")).toBe(0);
		expect(myAtoi("-")).toBe(0);
		expect(myAtoi("")).toBe(0);
	});

	it("should handle leading zeros", () => {
		expect(myAtoi("000123")).toBe(123);
		expect(myAtoi("-000123")).toBe(-123);
		expect(myAtoi("+000123")).toBe(123);
	});

	it("should handle decimal numbers", () => {
		expect(myAtoi("3.14159")).toBe(3);
		expect(myAtoi("-3.14159")).toBe(-3);
	});

	it("should handle special characters", () => {
		expect(myAtoi("  +  413")).toBe(0);
		expect(myAtoi("  -  413")).toBe(0);
		expect(myAtoi("00-42a1234")).toBe(0);
	});

	it("should handle large numbers", () => {
		expect(myAtoi("2147483648")).toBe(2147483648);
		expect(myAtoi("-2147483649")).toBe(-2147483649);
		expect(myAtoi("9999999999")).toBe(9999999999);
	});
});
