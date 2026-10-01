import { describe, expect, it } from "bun:test";
import { concatenationOfConsecutiveBinaryNumbers as concatenatedBinary } from ".";

describe("1680. Concatenation of Consecutive Binary Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(concatenatedBinary(1)).toBe(1);
		expect(concatenatedBinary(3)).toBe(27);
		expect(concatenatedBinary(12)).toBe(505379714);
	});

	it("matches building the binary string with BigInt", () => {
		let binary = "";
		for (let n = 1; n <= 200; n++) {
			binary += n.toString(2);
			expect(concatenatedBinary(n)).toBe(
				Number(BigInt(`0b${binary}`) % 1_000_000_007n),
			);
		}
	});

	it("handles the largest input", () => {
		expect(concatenatedBinary(100000)).toBe(757631812);
	});
});
