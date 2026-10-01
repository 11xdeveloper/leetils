import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { decryptStringFromAlphabetToIntegerMapping as freqAlphabets } from ".";

describe("1309. Decrypt String from Alphabet to Integer Mapping", () => {
	it("solves the examples from the problem statement", () => {
		expect(freqAlphabets("10#11#12")).toBe("jkab");
		expect(freqAlphabets("1326#")).toBe("acz");
	});

	it("decodes random encoded words", () => {
		const random = createRandom(1309);
		for (let run = 0; run < 300; run++) {
			const word = random.string(
				random.int(1, 12),
				"abcdefghijklmnopqrstuvwxyz",
			);
			const encoded = [...word]
				.map((char) => {
					const code = char.charCodeAt(0) - 96;
					return code >= 10 ? `${code}#` : String(code);
				})
				.join("");
			expect(freqAlphabets(encoded)).toBe(word);
		}
	});
});
