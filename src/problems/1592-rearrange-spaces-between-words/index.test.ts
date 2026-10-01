import { describe, expect, it } from "bun:test";
import { rearrangeSpacesBetweenWords as reorderSpaces } from ".";

describe("1592. Rearrange Spaces Between Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(reorderSpaces("  this   is  a sentence ")).toBe(
			"this   is   a   sentence",
		);
		expect(reorderSpaces(" practice   makes   perfect")).toBe(
			"practice   makes   perfect ",
		);
	});

	it("puts every space at the end for a single word", () => {
		expect(reorderSpaces("  hello ")).toBe("hello   ");
		expect(reorderSpaces("a")).toBe("a");
	});
});
