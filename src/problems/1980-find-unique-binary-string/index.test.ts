import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findUniqueBinaryString as findDifferentBinaryString } from ".";

describe("1980. Find Unique Binary String", () => {
	it("returns a missing string for the examples from the problem statement", () => {
		for (const nums of [
			["01", "10"],
			["00", "01"],
			["111", "011", "001"],
		]) {
			const result = findDifferentBinaryString(nums);
			expect(result.length).toBe(nums.length);
			expect(nums).not.toContain(result);
		}
	});

	it("returns a missing string for random inputs", () => {
		const random = createRandom(1980);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const nums = new Set<string>();
			while (nums.size < n) nums.add(random.string(n, "01"));
			const result = findDifferentBinaryString([...nums]);
			expect(result).toMatch(new RegExp(`^[01]{${n}}$`));
			expect(nums.has(result)).toBeFalse();
		}
	});
});
