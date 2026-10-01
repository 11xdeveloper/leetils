import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfGoodWaysToSplitAString as numSplits } from ".";

describe("1525. Number of Good Ways to Split a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSplits("aacaba")).toBe(2);
		expect(numSplits("abcd")).toBe(1);
	});

	it("matches checking every split on random inputs", () => {
		const random = createRandom(1525);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "abcd");
			let expected = 0;
			for (let i = 1; i < s.length; i++)
				if (new Set(s.slice(0, i)).size === new Set(s.slice(i)).size)
					expected++;
			expect(numSplits(s)).toBe(expected);
		}
	});
});
