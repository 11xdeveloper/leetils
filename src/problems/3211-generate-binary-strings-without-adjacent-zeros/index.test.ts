import { describe, expect, it } from "bun:test";
import { generateBinaryStringsWithoutAdjacentZeros as validStrings } from ".";

describe("3211. Generate Binary Strings Without Adjacent Zeros", () => {
	it("solves the examples from the problem statement", () => {
		expect(validStrings(3)).toEqual(["010", "011", "101", "110", "111"]);
		expect(validStrings(1)).toEqual(["0", "1"]);
	});

	it("matches filtering every binary string", () => {
		for (let n = 1; n <= 10; n++) {
			const all = Array.from({ length: 2 ** n }, (_, i) =>
				i.toString(2).padStart(n, "0"),
			);
			expect(validStrings(n)).toEqual(all.filter((s) => !s.includes("00")));
		}
	});
});
