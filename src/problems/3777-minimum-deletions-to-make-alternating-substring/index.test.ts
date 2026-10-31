import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumDeletionsToMakeAlternatingSubstring as minDeletions } from ".";

/** Applies each query directly. */
const byBruteForce = (s: string, queries: number[][]): number[] => {
	const chars = [...s];
	const answers: number[] = [];
	for (const [kind = 0, a = 0, b = 0] of queries) {
		if (kind === 1) chars[a] = chars[a] === "A" ? "B" : "A";
		else {
			let count = 0;
			for (let i = a; i < b; i++) if (chars[i] === chars[i + 1]) count++;
			answers.push(count);
		}
	}
	return answers;
};

describe("3777. Minimum Deletions to Make Alternating Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minDeletions("ABA", [
				[2, 1, 2],
				[1, 1],
				[2, 0, 2],
			]),
		).toEqual([0, 2]);
	});

	it("matches applying queries directly on random strings", () => {
		const random = createRandom(3777);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 12), "AB");
			const queries = Array.from({ length: 12 }, () => {
				if (random.int(0, 1)) return [1, random.int(0, s.length - 1)];
				const l = random.int(0, s.length - 1);
				return [2, l, random.int(l, s.length - 1)];
			});
			expect(minDeletions(s, queries)).toEqual(byBruteForce(s, queries));
		}
	});
});
