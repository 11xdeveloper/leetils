import { describe, expect, it } from "bun:test";
import { goatLatin as toGoatLatin } from ".";

describe("824. Goat Latin", () => {
	it("solves the examples from the problem statement", () => {
		expect(toGoatLatin("I speak Goat Latin")).toBe(
			"Imaa peaksmaaa oatGmaaaa atinLmaaaaa",
		);
		expect(toGoatLatin("The quick brown fox jumped over the lazy dog")).toBe(
			"heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa",
		);
	});
});
