import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findBeautifulIndicesInTheGivenArrayI } from ".";

/** Checks every pair of positions. */
const byBruteForce = (s: string, a: string, b: string, k: number): number[] => {
	const result: number[] = [];
	for (let i = 0; i + a.length <= s.length; i++) {
		if (!s.startsWith(a, i)) continue;
		for (
			let j = Math.max(0, i - k);
			j <= i + k && j + b.length <= s.length;
			j++
		)
			if (s.startsWith(b, j)) {
				result.push(i);
				break;
			}
	}
	return result;
};

describe("3006. Find Beautiful Indices in the Given Array I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findBeautifulIndicesInTheGivenArrayI(
				"isawsquirrelnearmysquirrelhouseohmy",
				"my",
				"squirrel",
				15,
			),
		).toEqual([16, 33]);
		expect(findBeautifulIndicesInTheGivenArrayI("abcd", "a", "a", 4)).toEqual([
			0,
		]);
	});

	it("matches checking every pair on random strings", () => {
		const random = createRandom(3006);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 20), "ab");
			const a = random.string(random.int(1, 3), "ab");
			const b = random.string(random.int(1, 3), "ab");
			const k = random.int(1, 6);
			expect(findBeautifulIndicesInTheGivenArrayI(s, a, b, k)).toEqual(
				byBruteForce(s, a, b, k),
			);
		}
	});
});
