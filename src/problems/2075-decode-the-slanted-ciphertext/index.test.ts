import { describe, expect, it } from "bun:test";
import { decodeTheSlantedCiphertext as decodeCiphertext } from ".";

describe("2075. Decode the Slanted Ciphertext", () => {
	it("solves the examples from the problem statement", () => {
		expect(decodeCiphertext("ch   ie   pr", 3)).toBe("cipher");
		expect(decodeCiphertext("iveo    eed   l te   olc", 4)).toBe(
			"i love leetcode",
		);
		expect(decodeCiphertext("coding", 1)).toBe("coding");
	});

	it("keeps leading spaces and handles empty text", () => {
		expect(decodeCiphertext(" b  ac", 2)).toBe(" abc");
		expect(decodeCiphertext("", 5)).toBe("");
	});
});
