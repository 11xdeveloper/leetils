import { describe, expect, it } from "bun:test";
import { braceExpansion as expand } from ".";

describe("1087. Brace Expansion", () => {
	it("solves the examples from the problem statement", () => {
		expect(expand("{a,b}c{d,e}f")).toEqual(["acdf", "acef", "bcdf", "bcef"]);
		expect(expand("abcd")).toEqual(["abcd"]);
	});

	it("sorts options given out of order", () => {
		expect(expand("{c,a,b}{z,x}")).toEqual([
			"ax",
			"az",
			"bx",
			"bz",
			"cx",
			"cz",
		]);
	});
});
