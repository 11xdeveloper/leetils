import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeActiveSectionWithTradeI } from "../3499-maximize-active-section-with-trade-i";
import { maximizeActiveSectionWithTradeII as maxActiveSectionsAfterTrade } from ".";

describe("3501. Maximize Active Section with Trade II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxActiveSectionsAfterTrade("01", [[0, 1]])).toEqual([1]);
		expect(
			maxActiveSectionsAfterTrade("0100", [
				[0, 3],
				[0, 2],
				[1, 3],
				[2, 3],
			]),
		).toEqual([4, 3, 1, 1]);
		expect(
			maxActiveSectionsAfterTrade("1000100", [
				[1, 5],
				[0, 6],
				[0, 4],
			]),
		).toEqual([6, 7, 2]);
	});

	it("matches trading on each substring with the single-trade solution", () => {
		const random = createRandom(3501);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "01");
			const l = random.int(0, s.length - 1);
			const r = random.int(l, s.length - 1);
			const sub = s.slice(l, r + 1);
			const outside =
				[...s].filter((c) => c === "1").length -
				[...sub].filter((c) => c === "1").length;
			expect(maxActiveSectionsAfterTrade(s, [[l, r]])).toEqual([
				outside + maximizeActiveSectionWithTradeI(sub),
			]);
		}
	});
});
