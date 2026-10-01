import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stringsDifferByOneCharacter as differByOne } from ".";

describe("1554. Strings Differ by One Character", () => {
	it("solves the examples from the problem statement", () => {
		expect(differByOne(["abcd", "acbd", "aacd"])).toBeTrue();
		expect(differByOne(["ab", "cd", "yz"])).toBeFalse();
		expect(differByOne(["abcd", "cccc", "abyd", "abab"])).toBeTrue();
	});

	it("handles one long string", () => {
		expect(differByOne(["a".repeat(100000)])).toBeFalse();
	});

	it("matches comparing every pair on random inputs", () => {
		const random = createRandom(1554);
		for (let run = 0; run < 300; run++) {
			const m = random.int(1, 4);
			const dict = [
				...new Set(
					Array.from({ length: random.int(1, 8) }, () =>
						random.string(m, "abc"),
					),
				),
			];
			const expected = dict.some((a, i) =>
				dict.some(
					(b, j) => i < j && [...a].filter((c, k) => c !== b[k]).length === 1,
				),
			);
			expect(differByOne(dict)).toBe(expected);
		}
	});
});
