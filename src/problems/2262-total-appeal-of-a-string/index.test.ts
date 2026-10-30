import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { totalAppealOfAString as appealSum } from ".";

describe("2262. Total Appeal of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(appealSum("abbca")).toBe(28);
		expect(appealSum("code")).toBe(20);
	});

	it("matches counting every substring on random strings", () => {
		const random = createRandom(2262);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 12), "abc");
			let expected = 0;
			for (let i = 0; i < s.length; i++)
				for (let j = i + 1; j <= s.length; j++)
					expected += new Set(s.slice(i, j)).size;
			expect(appealSum(s)).toBe(expected);
		}
	});
});
