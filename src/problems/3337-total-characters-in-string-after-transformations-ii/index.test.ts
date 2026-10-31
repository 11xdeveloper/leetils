import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { totalCharactersInStringAfterTransformationsII as lengthAfterTransformations } from ".";

/** Steps the letter counts one transformation at a time. */
const byBruteForce = (s: string, t: number, nums: number[]): number => {
	let counts = new Array<number>(26).fill(0);
	for (const c of s)
		counts[c.charCodeAt(0) - 97] = (counts[c.charCodeAt(0) - 97] ?? 0) + 1;
	for (let step = 0; step < t; step++) {
		const next = new Array<number>(26).fill(0);
		counts.forEach((count, c) => {
			for (let d = 1; d <= (nums[c] ?? 0); d++)
				next[(c + d) % 26] =
					((next[(c + d) % 26] ?? 0) + count) % 1_000_000_007;
		});
		counts = next;
	}
	return counts.reduce((a, b) => (a + b) % 1_000_000_007, 0);
};

describe("3337. Total Characters in String After Transformations II", () => {
	it("solves the examples from the problem statement", () => {
		const ones = new Array<number>(26).fill(1);
		expect(
			lengthAfterTransformations("abcyy", 2, [...ones.slice(0, 25), 2]),
		).toBe(7);
		expect(
			lengthAfterTransformations("azbk", 1, new Array<number>(26).fill(2)),
		).toBe(8);
	});

	it("matches stepping the counts on random inputs", () => {
		const random = createRandom(3337);
		for (let run = 0; run < 50; run++) {
			const s = random.string(random.int(1, 6), "abcxyz");
			const t = random.int(1, 30);
			const nums = random.array(26, 1, 3);
			expect(lengthAfterTransformations(s, t, nums)).toBe(
				byBruteForce(s, t, nums),
			);
		}
	});
});
