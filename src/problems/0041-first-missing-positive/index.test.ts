import { describe, expect, it } from "bun:test";
import { firstMissingPositive } from ".";

const bySet = (nums: number[]): number => {
	const present = new Set(nums);
	let missing = 1;
	while (present.has(missing)) missing++;
	return missing;
};

const missing = (nums: number[]): number => firstMissingPositive([...nums]);

describe("41. First Missing Positive", () => {
	it("solves the examples from the problem statement", () => {
		expect(missing([1, 2, 0])).toBe(3);
		expect(missing([3, 4, -1, 1])).toBe(2);
		expect(missing([7, 8, 9, 11, 12])).toBe(1);
	});

	it("returns n + 1 when 1 to n are all present", () => {
		expect(missing([1])).toBe(2);
		expect(missing([3, 1, 2])).toBe(4);
	});

	it("handles duplicates, which can't be swapped into place twice", () => {
		expect(missing([1, 1])).toBe(2);
		expect(missing([2, 2, 2])).toBe(1);
	});

	it("handles values at the limits of the constraints", () => {
		expect(missing([-(2 ** 31), 2 ** 31 - 1])).toBe(1);
	});

	it("matches checking a Set on random inputs", () => {
		let seed = 41;
		for (let run = 0; run < 500; run++) {
			const nums = Array.from({ length: 1 + (run % 15) }, () => {
				seed = (seed * 1103515245 + 12345) % 2 ** 31;
				return (seed % 20) - 4;
			});
			expect(missing(nums)).toBe(bySet(nums));
		}
	});
});
