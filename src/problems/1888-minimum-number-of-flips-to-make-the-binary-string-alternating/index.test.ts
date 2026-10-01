import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfFlipsToMakeTheBinaryStringAlternating as minFlips } from ".";

describe("1888. Minimum Number of Flips to Make the Binary String Alternating", () => {
	it("solves the examples from the problem statement", () => {
		expect(minFlips("111000")).toBe(2);
		expect(minFlips("010")).toBe(0);
		expect(minFlips("1110")).toBe(1);
	});

	it("matches trying every rotation on random strings", () => {
		const random = createRandom(1888);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "01");
			let best = Infinity;
			for (let r = 0; r < s.length; r++) {
				const t = s.slice(r) + s.slice(0, r);
				const zeroFirst = [...t].filter((c, i) => c !== String(i % 2)).length;
				best = Math.min(best, zeroFirst, t.length - zeroFirst);
			}
			expect(minFlips(s)).toBe(best);
		}
	});
});
