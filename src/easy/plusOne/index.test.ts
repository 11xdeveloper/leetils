import { describe, expect, it } from "bun:test";
import { plusOne } from "./index";

describe("plusOne", () => {
	it("should increment regular numbers correctly", () => {
		expect(plusOne([1, 2, 3])).toStrictEqual([1, 2, 4]);
		expect(plusOne([4, 3, 2, 1])).toStrictEqual([4, 3, 2, 2]);
	});

	it("should handle single digit numbers", () => {
		expect(plusOne([0])).toStrictEqual([1]);
		expect(plusOne([9])).toStrictEqual([1, 0]);
	});

	it("should handle numbers ending in 9", () => {
		expect(plusOne([1, 9])).toStrictEqual([2, 0]);
		expect(plusOne([9, 9])).toStrictEqual([1, 0, 0]);
		expect(plusOne([1, 9, 9])).toStrictEqual([2, 0, 0]);
	});

	it("should handle all nines", () => {
		expect(plusOne([9, 9, 9])).toStrictEqual([1, 0, 0, 0]);
		expect(plusOne([9, 9, 9, 9])).toStrictEqual([1, 0, 0, 0, 0]);
	});

	it("should handle large numbers", () => {
		expect(plusOne([1, 2, 3, 4, 5, 6, 7, 8, 9])).toStrictEqual([
			1, 2, 3, 4, 5, 6, 7, 9, 0,
		]);
		expect(plusOne([9, 8, 7, 6, 5, 4, 3, 2, 1])).toStrictEqual([
			9, 8, 7, 6, 5, 4, 3, 2, 2,
		]);
	});
});
