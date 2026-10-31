import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallySmallestStringAfterAdjacentRemovals as lexicographicallySmallestString } from ".";

/** Searches every sequence of removals. */
const byBruteForce = (s: string): string => {
	const seen = new Set([s]);
	const queue = [s];
	let best = s;
	for (let q = 0; q < queue.length; q++) {
		const t = queue[q] ?? "";
		if (t < best) best = t;
		for (let i = 0; i + 1 < t.length; i++) {
			const gap = Math.abs(t.charCodeAt(i) - t.charCodeAt(i + 1));
			if (gap !== 1 && gap !== 25) continue;
			const next = t.slice(0, i) + t.slice(i + 2);
			if (!seen.has(next)) {
				seen.add(next);
				queue.push(next);
			}
		}
	}
	return best;
};

describe("3563. Lexicographically Smallest String After Adjacent Removals", () => {
	it("solves the examples from the problem statement", () => {
		expect(lexicographicallySmallestString("abc")).toBe("a");
		expect(lexicographicallySmallestString("bcda")).toBe("");
		expect(lexicographicallySmallestString("zdce")).toBe("zdce");
	});

	it("matches searching every removal on random strings", () => {
		const random = createRandom(3563);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 9), "abcz");
			expect(lexicographicallySmallestString(s)).toBe(byBruteForce(s));
		}
	});
});
