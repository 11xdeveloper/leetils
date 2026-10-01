import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stringCompression } from ".";

const compress = (text: string): string => {
	const chars = [...text];
	const length = stringCompression(chars);
	return chars.slice(0, length).join("");
};

describe("443. String Compression", () => {
	it("solves the examples from the problem statement", () => {
		expect(compress("aabbccc")).toBe("a2b2c3");
		expect(compress("a")).toBe("a");
		expect(compress("abbbbbbbbbbbb")).toBe("ab12");
	});

	it("matches a regular expression replacement on random inputs", () => {
		const random = createRandom(443);
		for (let run = 0; run < 1000; run++) {
			let text = "";
			for (let i = random.int(1, 5); i > 0; i--)
				text += random.string(1, "ab1").repeat(random.int(1, 13));
			expect(compress(text)).toBe(
				text.replaceAll(/(.)\1*/g, (run, char) =>
					run.length > 1 ? char + run.length : char,
				),
			);
		}
	});
});
