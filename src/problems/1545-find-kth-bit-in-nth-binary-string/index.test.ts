import { describe, expect, it } from "bun:test";
import { findKthBitInNthBinaryString as findKthBit } from ".";

describe("1545. Find Kth Bit in Nth Binary String", () => {
	it("solves the examples from the problem statement", () => {
		expect(findKthBit(3, 1)).toBe("0");
		expect(findKthBit(4, 11)).toBe("1");
	});

	it("matches building the strings up to n = 12", () => {
		let s = "0";
		for (let n = 1; n <= 12; n++) {
			for (let k = 1; k <= s.length; k++)
				expect(findKthBit(n, k)).toBe(s[k - 1] ?? "");
			const inverted = [...s]
				.map((b) => (b === "0" ? "1" : "0"))
				.reverse()
				.join("");
			s = `${s}1${inverted}`;
		}
	});
});
