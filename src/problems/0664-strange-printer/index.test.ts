import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { strangePrinter } from ".";

/** Breadth-first search over what's on the paper, printing any run of any character. */
const bySearch = (s: string): number => {
	const alphabet = [...new Set(s)];
	const start = ".".repeat(s.length);
	const seen = new Set([start]);
	let frontier = [start];
	for (let turns = 0; ; turns++) {
		const next: string[] = [];
		for (const paper of frontier) {
			if (paper === s) return turns;
			for (let i = 0; i < s.length; i++) {
				for (let j = i; j < s.length; j++) {
					for (const char of alphabet) {
						const printed =
							paper.slice(0, i) + char.repeat(j - i + 1) + paper.slice(j + 1);
						if (!seen.has(printed)) {
							seen.add(printed);
							next.push(printed);
						}
					}
				}
			}
		}
		frontier = next;
	}
};

describe("664. Strange Printer", () => {
	it("solves the examples from the problem statement", () => {
		expect(strangePrinter("aaabbb")).toBe(2);
		expect(strangePrinter("aba")).toBe(2);
	});

	it("matches searching every sequence of prints on random strings", () => {
		const random = createRandom(664);
		for (let run = 0; run < 150; run++) {
			const s = random.string(random.int(1, 6), "abc");
			expect(strangePrinter(s)).toBe(bySearch(s));
		}
	});
});
