import { describe, expect, it } from "bun:test";
import { isHappy } from "./index";

describe("isHappy", () => {
	it("should identify happy numbers correctly", () => {
		expect(isHappy(19)).toBe(true);
		expect(isHappy(2)).toBe(false);
	});

	it("should handle single digit numbers", () => {
		expect(isHappy(1)).toBe(true);
		expect(isHappy(7)).toBe(true);
		expect(isHappy(4)).toBe(false);
	});

	it("should handle numbers that lead to cycles", () => {
		expect(isHappy(2)).toBe(false); // 2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 (cycle)
		expect(isHappy(4)).toBe(false); // 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 (cycle)
	});

	it("should handle numbers that quickly reach 1", () => {
		expect(isHappy(10)).toBe(true); // 10 -> 1
		expect(isHappy(100)).toBe(true); // 100 -> 1
	});

	it("should handle larger numbers", () => {
		expect(isHappy(999)).toBe(false);
		expect(isHappy(1000)).toBe(true);
	});

	it("should handle edge cases", () => {
		expect(isHappy(0)).toBe(false);
		expect(isHappy(-1)).toBe(false);
	});
});
