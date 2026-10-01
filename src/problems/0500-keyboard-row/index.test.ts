import { describe, expect, it } from "bun:test";
import { keyboardRow as findWords } from ".";

describe("500. Keyboard Row", () => {
	it("solves the examples from the problem statement", () => {
		expect(findWords(["Hello", "Alaska", "Dad", "Peace"])).toEqual([
			"Alaska",
			"Dad",
		]);
		expect(findWords(["omk"])).toEqual([]);
		expect(findWords(["adsdf", "sfd"])).toEqual(["adsdf", "sfd"]);
	});

	it("handles every row and mixed case", () => {
		expect(findWords(["QwErTy", "ZXCVBNM", "gaSH", "zap"])).toEqual([
			"QwErTy",
			"ZXCVBNM",
			"gaSH",
		]);
	});
});
