import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { decodedStringAtIndex as decodeAtIndex } from ".";

const decode = (s: string): string => {
	let tape = "";
	for (const char of s)
		tape = /\d/.test(char) ? tape.repeat(Number(char)) : tape + char;
	return tape;
};

describe("880. Decoded String at Index", () => {
	it("solves the examples from the problem statement", () => {
		expect(decodeAtIndex("leet2code3", 10)).toBe("o");
		expect(decodeAtIndex("ha22", 5)).toBe("h");
		expect(decodeAtIndex("a2345678999999999999999", 1)).toBe("a");
	});

	it("matches decoding in full on random short encodings", () => {
		const random = createRandom(880);
		for (let run = 0; run < 500; run++) {
			let s = random.string(1, "abc");
			for (let i = random.int(1, 6); i > 0; i--)
				s += random.int(0, 2)
					? random.string(1, "abc")
					: String(random.int(2, 3));
			const tape = decode(s);
			const k = random.int(1, tape.length);
			expect(decodeAtIndex(s, k)).toBe(tape.charAt(k - 1));
		}
	});
});
