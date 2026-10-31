import { describe, expect, it } from "bun:test";
import { countMonobitIntegers as countMonobit } from ".";

describe("3827. Count Monobit Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(countMonobit(1)).toBe(2);
		expect(countMonobit(4)).toBe(3);
	});

	it("counts 0 alone", () => {
		expect(countMonobit(0)).toBe(1);
	});
});
