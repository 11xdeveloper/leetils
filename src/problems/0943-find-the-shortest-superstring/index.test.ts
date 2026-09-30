import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { findTheShortestSuperstring as shortestSuperstring } from ".";

/** The shortest length over every order, joining neighbours with their largest overlap. */
const shortestLength = (words: string[]): number => {
	const join = (a: string, b: string) => {
		for (let length = Math.min(a.length, b.length); length > 0; length--)
			if (a.endsWith(b.slice(0, length))) return a + b.slice(length);
		return a + b;
	};
	return Math.min(
		...permutations(words.map((_, i) => i)).map(
			(order) => order.map((i) => words[i] ?? "").reduce(join).length,
		),
	);
};

describe("943. Find the Shortest Superstring", () => {
	it("solves the examples from the problem statement", () => {
		const first = shortestSuperstring(["alex", "loves", "leetcode"]);
		expect(first).toHaveLength(17);
		for (const word of ["alex", "loves", "leetcode"])
			expect(first).toContain(word);
		expect(
			shortestSuperstring(["catg", "ctaagt", "gcta", "ttca", "atgcatc"]),
		).toBe("gctaagttcatgcatc");
	});

	it("gives a shortest superstring for random words", () => {
		const random = createRandom(943);
		for (let run = 0; run < 300; run++) {
			const pool = [
				...new Set(
					Array.from({ length: random.int(1, 6) }, () =>
						random.string(random.int(1, 5), "ab"),
					),
				),
			];
			const words = pool.filter(
				(word) => !pool.some((other) => other !== word && other.includes(word)),
			);
			const result = shortestSuperstring(words);
			for (const word of words) expect(result).toContain(word);
			expect(result.length).toBe(shortestLength(words));
		}
	});
});
