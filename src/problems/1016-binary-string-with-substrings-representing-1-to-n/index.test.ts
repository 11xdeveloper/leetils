import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { binaryStringWithSubstringsRepresenting1ToN as queryString } from ".";

describe("1016. Binary String With Substrings Representing 1 To N", () => {
	it("solves the examples from the problem statement", () => {
		expect(queryString("0110", 3)).toBeTrue();
		expect(queryString("0110", 4)).toBeFalse();
	});

	it("matches checking every number on random strings", () => {
		const random = createRandom(1016);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 12), "01");
			const n = random.int(1, 30);
			expect(queryString(s, n)).toBe(
				Array.from({ length: n }, (_, i) => (i + 1).toString(2)).every((bits) =>
					s.includes(bits),
				),
			);
		}
	});

	it("rejects huge n quickly", () => {
		expect(queryString("1".repeat(1000), 10 ** 9)).toBeFalse();
	});
});
