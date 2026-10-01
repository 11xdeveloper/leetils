import { describe, expect, it } from "bun:test";
import { countSquareSumTriples as countTriples } from ".";

describe("1925. Count Square Sum Triples", () => {
	it("solves the examples from the problem statement", () => {
		expect(countTriples(5)).toBe(2);
		expect(countTriples(10)).toBe(4);
	});

	it("returns 0 below the first triple", () => {
		expect(countTriples(4)).toBe(0);
	});
});
