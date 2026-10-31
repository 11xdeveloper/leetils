import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostGoodCaption } from ".";

/** Tries every caption over a small alphabet. */
const byBruteForce = (caption: string): string => {
	const n = caption.length;
	if (n < 3) return "";
	let best = "";
	let bestCost = Number.POSITIVE_INFINITY;
	const alphabet = "abcdef";
	for (let code = 0; code < alphabet.length ** n; code++) {
		let t = "";
		for (
			let rest = code, i = 0;
			i < n;
			i++, rest = Math.floor(rest / alphabet.length)
		)
			t = alphabet.charAt(rest % alphabet.length) + t;
		const runs = t.match(/(.)\1*/g) ?? [];
		if (runs.some((run) => run.length < 3)) continue;
		let cost = 0;
		for (let i = 0; i < n; i++)
			cost += Math.abs(t.charCodeAt(i) - caption.charCodeAt(i));
		if (cost < bestCost || (cost === bestCost && t < best)) {
			best = t;
			bestCost = cost;
		}
	}
	return best;
};

describe("3441. Minimum Cost Good Caption", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCostGoodCaption("cdcd")).toBe("cccc");
		expect(minimumCostGoodCaption("aca")).toBe("aaa");
		expect(minimumCostGoodCaption("bc")).toBe("");
	});

	it("matches trying every caption on random strings", () => {
		const random = createRandom(3441);
		for (let run = 0; run < 60; run++) {
			const caption = random.string(random.int(3, 6), "abcd");
			expect(minimumCostGoodCaption(caption)).toBe(byBruteForce(caption));
		}
	});
});
