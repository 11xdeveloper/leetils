import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeActiveSectionWithTradeI as maxActiveSectionsAfterTrade } from ".";

/** Tries every pair of blocks to trade. */
const byBruteForce = (s: string): number => {
	const t = `1${s}1`;
	let best = [...s].filter((c) => c === "1").length;
	const blocks = (str: string, bit: string) => {
		const result: [number, number][] = [];
		for (let i = 0; i < str.length; ) {
			let j = i;
			while (j < str.length && str[j] === str[i]) j++;
			if (str[i] === bit && i > 0 && j < str.length) result.push([i, j]);
			i = j;
		}
		return result;
	};
	for (const [a, b] of blocks(t, "1")) {
		const dissolved = t.slice(0, a) + "0".repeat(b - a) + t.slice(b);
		for (const [c, d] of blocks(dissolved, "0")) {
			const filled =
				dissolved.slice(0, c) + "1".repeat(d - c) + dissolved.slice(d);
			best = Math.max(
				best,
				[...filled.slice(1, -1)].filter((ch) => ch === "1").length,
			);
		}
	}
	return best;
};

describe("3499. Maximize Active Section with Trade I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxActiveSectionsAfterTrade("01")).toBe(1);
		expect(maxActiveSectionsAfterTrade("0100")).toBe(4);
		expect(maxActiveSectionsAfterTrade("1000100")).toBe(7);
		expect(maxActiveSectionsAfterTrade("01010")).toBe(4);
	});

	it("matches trying every trade on random strings", () => {
		const random = createRandom(3499);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "01");
			expect(maxActiveSectionsAfterTrade(s)).toBe(byBruteForce(s));
		}
	});
});
