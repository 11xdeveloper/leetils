import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stickersToSpellWord as minStickers } from ".";

/** Breadth-first search over how many of each letter are still needed, trying every sticker. */
const byCounts = (stickers: string[], target: string): number => {
	const letters = [...new Set(target)];
	const need = letters.map(
		(letter) => [...target].filter((char) => char === letter).length,
	);
	const seen = new Set([need.join()]);
	let frontier = [need];
	for (let used = 0; frontier.length > 0; used++) {
		const next: number[][] = [];
		for (const state of frontier) {
			if (state.every((count) => count === 0)) return used;
			for (const sticker of stickers) {
				const after = state.map((count, i) =>
					Math.max(
						0,
						count - [...sticker].filter((char) => char === letters[i]).length,
					),
				);
				if (!seen.has(after.join())) {
					seen.add(after.join());
					next.push(after);
				}
			}
		}
		frontier = next;
	}
	return -1;
};

describe("691. Stickers to Spell Word", () => {
	it("solves the examples from the problem statement", () => {
		expect(minStickers(["with", "example", "science"], "thehat")).toBe(3);
		expect(minStickers(["notice", "possible"], "basicbasic")).toBe(-1);
	});

	it("matches searching letter counts on random inputs", () => {
		const random = createRandom(691);
		for (let run = 0; run < 500; run++) {
			const stickers = Array.from({ length: random.int(1, 4) }, () =>
				random.string(random.int(1, 4), "abcd"),
			);
			const target = random.string(random.int(1, 8), "abcd");
			expect(minStickers(stickers, target)).toBe(byCounts(stickers, target));
		}
	});
});
