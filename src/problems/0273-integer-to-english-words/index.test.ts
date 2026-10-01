import { describe, expect, it } from "bun:test";
import { integerToEnglishWords as words } from ".";

describe("273. Integer to English Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(words(123)).toBe("One Hundred Twenty Three");
		expect(words(12345)).toBe("Twelve Thousand Three Hundred Forty Five");
		expect(words(1234567)).toBe(
			"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven",
		);
	});

	it("handles zero, teens and round numbers", () => {
		expect(words(0)).toBe("Zero");
		expect(words(13)).toBe("Thirteen");
		expect(words(20)).toBe("Twenty");
		expect(words(100)).toBe("One Hundred");
		expect(words(1000)).toBe("One Thousand");
	});

	it("skips groups of zeros", () => {
		expect(words(1_000_001)).toBe("One Million One");
		expect(words(1_000_010_000)).toBe("One Billion Ten Thousand");
	});

	it("handles the largest 32-bit integer", () => {
		expect(words(2 ** 31 - 1)).toBe(
			"Two Billion One Hundred Forty Seven Million Four Hundred Eighty Three Thousand Six Hundred Forty Seven",
		);
	});

	it("never produces double or edge spaces", () => {
		for (let n = 0; n <= 100_000; n += 7) {
			expect(words(n)).not.toMatch(/^ | $| {2}/);
		}
	});
});
