import { describe, expect, it } from "bun:test";
import { stringCompressionIII as compressedString } from ".";

describe("3163. String Compression III", () => {
	it("solves the examples from the problem statement", () => {
		expect(compressedString("abcde")).toBe("1a1b1c1d1e");
		expect(compressedString("aaaaaaaaaaaaaabb")).toBe("9a5a2b");
	});
});
