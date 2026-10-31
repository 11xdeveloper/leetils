import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallySmallestStringAfterDeletingDuplicateCharacters as lexSmallestAfterDeletion } from ".";

/** Searches every sequence of deletions. */
const byBruteForce = (s: string): string => {
	const seen = new Set([s]);
	const queue = [s];
	let best = s;
	for (let q = 0; q < queue.length; q++) {
		const t = queue[q] ?? "";
		if (t < best) best = t;
		for (let i = 0; i < t.length; i++) {
			if (t.split(t.charAt(i)).length - 1 < 2) continue;
			const next = t.slice(0, i) + t.slice(i + 1);
			if (!seen.has(next)) {
				seen.add(next);
				queue.push(next);
			}
		}
	}
	return best;
};

describe("3816. Lexicographically Smallest String After Deleting Duplicate Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(lexSmallestAfterDeletion("aaccb")).toBe("aacb");
		expect(lexSmallestAfterDeletion("z")).toBe("z");
	});

	it("matches searching every deletion on random strings", () => {
		const random = createRandom(3816);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 9), "abc");
			expect(lexSmallestAfterDeletion(s)).toBe(byBruteForce(s));
		}
	});
});
