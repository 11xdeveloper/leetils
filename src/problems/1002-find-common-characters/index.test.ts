import { describe, expect, it } from "bun:test";
import { findCommonCharacters as commonChars } from ".";

describe("1002. Find Common Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(commonChars(["bella", "label", "roller"])).toEqual(["e", "l", "l"]);
		expect(commonChars(["cool", "lock", "cook"])).toEqual(["c", "o"]);
	});
});
