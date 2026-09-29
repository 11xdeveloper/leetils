import { describe, expect, it } from "bun:test";
import { addBinary } from ".";

describe("67. Add Binary", () => {
	it("solves the examples from the problem statement", () => {
		expect(addBinary("11", "1")).toBe("100");
		expect(addBinary("1010", "1011")).toBe("10101");
	});

	it("adds every pair of single digits", () => {
		expect(addBinary("0", "0")).toBe("0");
		expect(addBinary("1", "0")).toBe("1");
		expect(addBinary("0", "1")).toBe("1");
		expect(addBinary("1", "1")).toBe("10");
	});

	it("adds strings of different lengths in either order", () => {
		expect(addBinary("111", "1")).toBe("1000");
		expect(addBinary("1", "111")).toBe("1000");
		expect(addBinary("100", "0")).toBe("100");
	});

	it("handles numbers too large for a JavaScript number", () => {
		const ones = "1".repeat(10_000);
		expect(addBinary(ones, "1")).toBe(`1${"0".repeat(10_000)}`);
	});

	it("agrees with BigInt addition", () => {
		for (let x = 0; x < 64; x++) {
			for (let y = 0; y < 64; y++) {
				expect(addBinary(x.toString(2), y.toString(2))).toBe(
					(x + y).toString(2),
				);
			}
		}
	});
});
