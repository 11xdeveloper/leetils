import { describe, expect, it } from "bun:test";
import { validBinaryStringsWithCostLimit as generateValidStrings } from ".";

describe("3955. Valid Binary Strings With Cost Limit", () => {
	it("solves the examples from the problem statement", () => {
		expect(generateValidStrings(3, 1).sort()).toEqual(["000", "010", "100"]);
		expect(generateValidStrings(1, 0).sort()).toEqual(["0", "1"]);
	});

	it("matches filtering every string", () => {
		for (let n = 1; n <= 8; n++)
			for (const k of [0, 3, 10, 28]) {
				const expected = Array.from({ length: 1 << n }, (_, m) =>
					m.toString(2).padStart(n, "0"),
				).filter((s) => {
					if (s.includes("11")) return false;
					return (
						[...s].reduce((sum, c, i) => (c === "1" ? sum + i : sum), 0) <= k
					);
				});
				expect(generateValidStrings(n, k).sort()).toEqual(expected.sort());
			}
	});
});
