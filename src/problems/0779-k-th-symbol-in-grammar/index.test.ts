import { describe, expect, it } from "bun:test";
import { kThSymbolInGrammar as kthGrammar } from ".";

describe("779. K-th Symbol in Grammar", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthGrammar(1, 1)).toBe(0);
		expect(kthGrammar(2, 1)).toBe(0);
		expect(kthGrammar(2, 2)).toBe(1);
	});

	it("matches building the rows up to n = 14", () => {
		let row = "0";
		for (let n = 1; n <= 14; n++) {
			for (let k = 1; k <= row.length; k++)
				expect(kthGrammar(n, k)).toBe(Number(row.charAt(k - 1)));
			row = [...row].map((symbol) => (symbol === "0" ? "01" : "10")).join("");
		}
	});

	it("handles the largest input", () => {
		expect(kthGrammar(30, 2 ** 29)).toBe(1);
	});
});
