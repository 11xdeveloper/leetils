import { describe, expect, it } from "bun:test";
import { totalCharactersInStringAfterTransformationsI as lengthAfterTransformations } from ".";

describe("3335. Total Characters in String After Transformations I", () => {
	it("solves the examples from the problem statement", () => {
		expect(lengthAfterTransformations("abcyy", 2)).toBe(7);
		expect(lengthAfterTransformations("azbk", 1)).toBe(5);
	});

	it("matches transforming the string directly", () => {
		let s = "az";
		for (let t = 1; t <= 40; t++) {
			s = [...s]
				.map((c) =>
					c === "z" ? "ab" : String.fromCharCode(c.charCodeAt(0) + 1),
				)
				.join("");
			expect(lengthAfterTransformations("az", t)).toBe(s.length);
		}
	});
});
