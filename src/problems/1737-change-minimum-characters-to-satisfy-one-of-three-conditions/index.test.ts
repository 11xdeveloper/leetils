import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { changeMinimumCharactersToSatisfyOneOfThreeConditions as minCharacters } from ".";

/** Checks every final letter range for each string, counting changes letter by letter. */
const byBruteForce = (a: string, b: string): number => {
	const letters = "abcdefghijklmnopqrstuvwxyz";
	const changes = (s: string, ok: (c: string) => boolean) =>
		[...s].filter((c) => !ok(c)).length;
	let best = Infinity;
	for (const letter of letters)
		best = Math.min(
			best,
			changes(a, (c) => c === letter) + changes(b, (c) => c === letter),
		);
	for (let i = 1; i < 26; i++) {
		const boundary = letters[i] ?? "z";
		best = Math.min(
			best,
			changes(a, (c) => c < boundary) + changes(b, (c) => c >= boundary),
		);
		best = Math.min(
			best,
			changes(b, (c) => c < boundary) + changes(a, (c) => c >= boundary),
		);
	}
	return best;
};

describe("1737. Change Minimum Characters to Satisfy One of Three Conditions", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCharacters("aba", "caa")).toBe(2);
		expect(minCharacters("dabadd", "cda")).toBe(3);
	});

	it("matches counting changes for every target on random inputs", () => {
		const random = createRandom(1737);
		for (let run = 0; run < 300; run++) {
			const a = random.string(random.int(1, 8), "abcdz");
			const b = random.string(random.int(1, 8), "abcdz");
			expect(minCharacters(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
