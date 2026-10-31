import { describe, expect, it } from "bun:test";
import { removeAdjacentAlmostEqualCharacters as removeAlmostEqualCharacters } from ".";

describe("2957. Remove Adjacent Almost-Equal Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeAlmostEqualCharacters("aaaaa")).toBe(2);
		expect(removeAlmostEqualCharacters("abddez")).toBe(2);
		expect(removeAlmostEqualCharacters("zyxyxyz")).toBe(3);
	});
});
