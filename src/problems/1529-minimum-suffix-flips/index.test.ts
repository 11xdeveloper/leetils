import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSuffixFlips as minFlips } from ".";

/** Breadth-first search over strings reachable by suffix flips. */
const byBruteForce = (target: string): number => {
	let frontier = ["0".repeat(target.length)];
	const seen = new Set(frontier);
	for (let flips = 0; ; flips++) {
		if (frontier.includes(target)) return flips;
		const next: string[] = [];
		for (const s of frontier) {
			for (let i = 0; i < s.length; i++) {
				const t =
					s.slice(0, i) +
					[...s.slice(i)].map((b) => (b === "0" ? "1" : "0")).join("");
				if (seen.has(t)) continue;
				seen.add(t);
				next.push(t);
			}
		}
		frontier = next;
	}
};

describe("1529. Minimum Suffix Flips", () => {
	it("solves the examples from the problem statement", () => {
		expect(minFlips("10111")).toBe(3);
		expect(minFlips("101")).toBe(3);
		expect(minFlips("00000")).toBe(0);
	});

	it("matches searching over flips on random targets", () => {
		const random = createRandom(1529);
		for (let run = 0; run < 100; run++) {
			const target = random.string(random.int(1, 8), "01");
			expect(minFlips(target)).toBe(byBruteForce(target));
		}
	});
});
