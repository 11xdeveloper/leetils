import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { decodeString } from ".";

/** Builds a random encoded string alongside what it decodes to. */
const randomEncoded = (
	random: Random,
	depth: number,
): [encoded: string, decoded: string] => {
	let encoded = "";
	let decoded = "";
	for (let i = random.int(1, 3); i > 0; i--) {
		if (depth > 0 && random.int(0, 1) === 0) {
			const count = random.int(1, 12);
			const [inner, innerDecoded] = randomEncoded(random, depth - 1);
			encoded += `${count}[${inner}]`;
			decoded += innerDecoded.repeat(count);
		} else {
			const text = random.string(random.int(1, 3), "abc");
			encoded += text;
			decoded += text;
		}
	}
	return [encoded, decoded];
};

describe("394. Decode String", () => {
	it("solves the examples from the problem statement", () => {
		expect(decodeString("3[a]2[bc]")).toBe("aaabcbc");
		expect(decodeString("3[a2[c]]")).toBe("accaccacc");
		expect(decodeString("2[abc]3[cd]ef")).toBe("abcabccdcdcdef");
	});

	it("reads multi-digit counts", () => {
		expect(decodeString("10[a]")).toBe("aaaaaaaaaa");
	});

	it("decodes random nested encodings", () => {
		const random = createRandom(394);
		for (let run = 0; run < 500; run++) {
			const [encoded, decoded] = randomEncoded(random, 3);
			expect(decodeString(encoded)).toBe(decoded);
		}
	});
});
