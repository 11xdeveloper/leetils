import { describe, expect, it } from "bun:test";
import { countAndSay } from ".";

// The first ten terms, from OEIS A005150.
const TERMS = [
	"1",
	"11",
	"21",
	"1211",
	"111221",
	"312211",
	"13112221",
	"1113213211",
	"31131211131221",
	"13211311123113112211",
];

// The lengths of the first 30 terms, from OEIS A005341.
const LENGTHS = [
	1, 2, 2, 4, 6, 6, 8, 10, 14, 20, 26, 34, 46, 62, 78, 102, 134, 176, 226, 302,
	408, 528, 678, 904, 1182, 1540, 2012, 2606, 3410, 4462,
];

describe("38. Count and Say", () => {
	it("solves the examples from the problem statement", () => {
		expect(countAndSay(4)).toBe("1211");
		expect(countAndSay(1)).toBe("1");
	});

	it("matches the first ten terms of the sequence", () => {
		for (const [i, term] of TERMS.entries()) {
			expect(countAndSay(i + 1)).toBe(term);
		}
	});

	it("matches the known term lengths up to the constraint of 30", () => {
		for (const [i, length] of LENGTHS.entries()) {
			expect(countAndSay(i + 1)).toHaveLength(length);
		}
	});
});
