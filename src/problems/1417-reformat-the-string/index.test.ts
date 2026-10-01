import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reformatTheString as reformat } from ".";

const isDigit = (char: string) => char >= "0" && char <= "9";

describe("1417. Reformat The String", () => {
	it("solves the examples from the problem statement", () => {
		const result = reformat("a0b1c2");
		expect([...result].sort()).toEqual([..."a0b1c2"].sort());
		expect(reformat("leetcode")).toBe("");
		expect(reformat("1229857369")).toBe("");
	});

	it("alternates kinds whenever the counts allow it on random inputs", () => {
		const random = createRandom(1417);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "ab12");
			const result = reformat(s);
			const digits = [...s].filter(isDigit).length;
			if (Math.abs(2 * digits - s.length) > 1) {
				expect(result).toBe("");
				continue;
			}
			expect([...result].sort()).toEqual([...s].sort());
			for (let i = 1; i < result.length; i++) {
				expect(isDigit(result[i] ?? "")).not.toBe(isDigit(result[i - 1] ?? ""));
			}
		}
	});
});
