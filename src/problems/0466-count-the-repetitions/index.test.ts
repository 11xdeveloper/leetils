import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheRepetitions as getMaxRepetitions } from ".";

/** Builds both strings in full and greedily counts copies of the second. */
const bySimulation = (
	s1: string,
	n1: number,
	s2: string,
	n2: number,
): number => {
	const text = s1.repeat(n1);
	const pattern = s2.repeat(n2);
	let matched = 0;
	for (const char of text)
		if (char === pattern.charAt(matched % pattern.length)) matched++;
	return Math.floor(matched / pattern.length);
};

describe("466. Count The Repetitions", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMaxRepetitions("acb", 4, "ab", 2)).toBe(2);
		expect(getMaxRepetitions("acb", 1, "acb", 1)).toBe(1);
	});

	it("returns 0 when s2 has a character missing from s1", () => {
		expect(getMaxRepetitions("abc", 1000, "d", 1)).toBe(0);
	});

	it("handles the largest inputs quickly", () => {
		expect(getMaxRepetitions("a".repeat(100), 1e6, "a", 1)).toBe(1e8);
		expect(getMaxRepetitions("ab", 1e6, "ba".repeat(50), 1)).toBe(19999);
	});

	it("matches building the strings on random inputs", () => {
		const random = createRandom(466);
		for (let run = 0; run < 1000; run++) {
			const s1 = random.string(random.int(1, 6), "abc");
			const s2 = random.string(random.int(1, 4), "abc");
			const n1 = random.int(1, 30);
			const n2 = random.int(1, 4);
			expect(getMaxRepetitions(s1, n1, s2, n2)).toBe(
				bySimulation(s1, n1, s2, n2),
			);
		}
	});
});
