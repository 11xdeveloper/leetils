import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSwapsToMakeStringsEqual as minimumSwap } from ".";

/** Breadth-first search over swaps between the strings. */
const byBruteForce = (s1: string, s2: string): number => {
	let frontier = [`${s1}|${s2}`];
	const seen = new Set(frontier);
	for (let swaps = 0; frontier.length > 0; swaps++) {
		const next: string[] = [];
		for (const state of frontier) {
			const [a = "", b = ""] = state.split("|");
			if (a === b) return swaps;
			for (let i = 0; i < a.length; i++) {
				for (let j = 0; j < b.length; j++) {
					const [x, y] = [[...a], [...b]];
					[x[i], y[j]] = [y[j] ?? "", x[i] ?? ""];
					const key = `${x.join("")}|${y.join("")}`;
					if (seen.has(key)) continue;
					seen.add(key);
					next.push(key);
				}
			}
		}
		frontier = next;
	}
	return -1;
};

describe("1247. Minimum Swaps to Make Strings Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSwap("xx", "yy")).toBe(1);
		expect(minimumSwap("xy", "yx")).toBe(2);
		expect(minimumSwap("xx", "xy")).toBe(-1);
	});

	it("matches searching over swaps on random inputs", () => {
		const random = createRandom(1247);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 5);
			const [s1, s2] = [random.string(n, "xy"), random.string(n, "xy")];
			expect(minimumSwap(s1, s2)).toBe(byBruteForce(s1, s2));
		}
	});
});
