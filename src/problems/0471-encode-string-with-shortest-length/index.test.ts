import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { decodeString } from "../0394-decode-string";
import { encodeStringWithShortestLength as encode } from ".";

/** The shortest encoded length, trying every split and every repeating unit. */
const shortestLength = (s: string): number => {
	const memo = new Map<string, number>();
	const search = (text: string): number => {
		const known = memo.get(text);
		if (known !== undefined) return known;
		let best = text.length;
		for (let k = 1; k < text.length; k++)
			best = Math.min(best, search(text.slice(0, k)) + search(text.slice(k)));
		for (let unit = 1; unit < text.length; unit++) {
			if (
				text.length % unit === 0 &&
				text.slice(0, unit).repeat(text.length / unit) === text
			) {
				best = Math.min(
					best,
					String(text.length / unit).length + 2 + search(text.slice(0, unit)),
				);
			}
		}
		memo.set(text, best);
		return best;
	};
	return search(s);
};

describe("471. Encode String with Shortest Length", () => {
	it("solves the examples from the problem statement", () => {
		expect(encode("aaa")).toBe("aaa");
		expect(encode("aaaaa")).toBe("5[a]");
		expect(encode("aaaaaaaaaa")).toHaveLength(5);
		expect(encode("aabcaabcd")).toBe("2[aabc]d");
		expect(encode("abbbabbbcabbbabbbc")).toBe("2[2[abbb]c]");
	});

	it("gives a shortest encoding that decodes back to the input", () => {
		const random = createRandom(471);
		for (let run = 0; run < 500; run++) {
			let s = "";
			for (let i = random.int(1, 4); i > 0; i--)
				s += random.string(random.int(1, 3), "ab").repeat(random.int(1, 6));
			const encoded = encode(s);
			expect(decodeString(encoded)).toBe(s);
			expect(encoded.length).toBe(shortestLength(s));
		}
	});

	it("handles the longest inputs", () => {
		const s = "abcab".repeat(30);
		expect(decodeString(encode(s))).toBe(s);
		expect(encode(s)).toBe("30[abcab]");
	});
});
