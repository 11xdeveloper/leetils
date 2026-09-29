import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { isomorphicStrings } from ".";

/** Replaces each character with the index of its first appearance. */
const pattern = (s: string): string =>
	[...s].map((char) => s.indexOf(char)).join(",");

describe("205. Isomorphic Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(isomorphicStrings("egg", "add")).toBeTrue();
		expect(isomorphicStrings("foo", "bar")).toBeFalse();
		expect(isomorphicStrings("paper", "title")).toBeTrue();
	});

	it("rejects two characters mapping to the same one", () => {
		expect(isomorphicStrings("badc", "baba")).toBeFalse();
	});

	it("allows a character to map to itself and to other ASCII characters", () => {
		expect(isomorphicStrings("ab", "ab")).toBeTrue();
		expect(isomorphicStrings("a1 ", "#b!")).toBeTrue();
	});

	it("matches comparing first-appearance patterns on random inputs", () => {
		const random = createRandom(205);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 8);
			const s = random.string(n, "abc");
			const t = random.string(n, "xyz");
			expect(isomorphicStrings(s, t)).toBe(pattern(s) === pattern(t));
		}
	});
});
