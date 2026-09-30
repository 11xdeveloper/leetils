import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallySmallestEquivalentString as smallestEquivalentString } from ".";

describe("1061. Lexicographically Smallest Equivalent String", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestEquivalentString("parker", "morris", "parser")).toBe(
			"makkek",
		);
		expect(smallestEquivalentString("hello", "world", "hold")).toBe("hdld");
		expect(smallestEquivalentString("leetcode", "programs", "sourcecode")).toBe(
			"aauaaaaada",
		);
	});

	it("matches searching the equivalence graph on random inputs", () => {
		const random = createRandom(1061);
		for (let run = 0; run < 500; run++) {
			const length = random.int(1, 6);
			const [s1, s2] = [
				random.string(length, "abcdef"),
				random.string(length, "abcdef"),
			];
			const base = random.string(random.int(1, 6), "abcdefg");
			const smallest = (letter: string): string => {
				const seen = new Set([letter]);
				const queue = [letter];
				for (const current of queue) {
					for (let i = 0; i < length; i++) {
						const other =
							s1.charAt(i) === current
								? s2.charAt(i)
								: s2.charAt(i) === current
									? s1.charAt(i)
									: undefined;
						if (other && !seen.has(other)) {
							seen.add(other);
							queue.push(other);
						}
					}
				}
				return [...seen].sort()[0] ?? letter;
			};
			expect(smallestEquivalentString(s1, s2, base)).toBe(
				[...base].map(smallest).join(""),
			);
		}
	});
});
