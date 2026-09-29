import { describe, expect, it } from "bun:test";
import { validNumber } from ".";

describe("65. Valid Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(validNumber("0")).toBeTrue();
		expect(validNumber("e")).toBeFalse();
		expect(validNumber(".")).toBeFalse();
	});

	it("accepts every valid number listed in the problem statement", () => {
		for (const s of [
			"2",
			"0089",
			"-0.1",
			"+3.14",
			"4.",
			"-.9",
			"2e10",
			"-90E3",
			"3e+7",
			"+6e-1",
			"53.5e93",
			"-123.456e789",
		]) {
			expect(validNumber(s)).toBeTrue();
		}
	});

	it("rejects every invalid number listed in the problem statement", () => {
		for (const s of [
			"abc",
			"1a",
			"1e",
			"e3",
			"99e2.5",
			"--6",
			"-+3",
			"95a54e53",
		]) {
			expect(validNumber(s)).toBeFalse();
		}
	});

	it("rejects signs, points and exponents without digits", () => {
		for (const s of ["+", "-", "+.", ".e1", "4e+", "e+5", "+e", "1e-"]) {
			expect(validNumber(s)).toBeFalse();
		}
	});

	it("rejects spaces and repeated parts", () => {
		for (const s of [" 1", "1 ", "1.2.3", "1e2e3", "1..", "..1"]) {
			expect(validNumber(s)).toBeFalse();
		}
	});

	it("accepts a point at either end of the digits", () => {
		expect(validNumber("1.e5")).toBeTrue();
		expect(validNumber(".5e-2")).toBeTrue();
	});
});
