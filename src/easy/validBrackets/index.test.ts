import { describe, expect, it } from "bun:test";
import { validBrackets } from "./index";

describe("validBrackets", () => {
	it("should validate simple bracket pairs", () => {
		expect(validBrackets("()")).toBe(true);
		expect(validBrackets("[]")).toBe(true);
		expect(validBrackets("{}")).toBe(true);
	});

	it("should validate multiple bracket pairs", () => {
		expect(validBrackets("()[]{}")).toBe(true);
		expect(validBrackets("([{}])")).toBe(true);
		expect(validBrackets("{[]}")).toBe(true);
	});

	it("should detect mismatched brackets", () => {
		expect(validBrackets("(]")).toBe(false);
		expect(validBrackets("([)]")).toBe(false);
		expect(validBrackets("{[}]")).toBe(false);
	});

	it("should handle nested brackets", () => {
		expect(validBrackets("((()))")).toBe(true);
		expect(validBrackets("[[[]]]")).toBe(true);
		expect(validBrackets("{{{}}}")).toBe(true);
	});

	it("should handle empty and single character strings", () => {
		expect(validBrackets("")).toBe(true);
		expect(validBrackets("(")).toBe(false);
		expect(validBrackets("}")).toBe(false);
	});

	it("should handle complex combinations", () => {
		expect(validBrackets("({[]}){}")).toBe(true);
		expect(validBrackets("((())){[]}")).toBe(true);
		expect(validBrackets("((())){[]}(")).toBe(false);
	});
});
