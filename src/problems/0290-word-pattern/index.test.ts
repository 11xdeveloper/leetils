import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordPattern } from ".";

/** Replaces each item with the index of its first appearance. */
const shape = (items: string[]): string =>
	items.map((item) => items.indexOf(item)).join(",");

describe("290. Word Pattern", () => {
	it("solves the examples from the problem statement", () => {
		expect(wordPattern("abba", "dog cat cat dog")).toBeTrue();
		expect(wordPattern("abba", "dog cat cat fish")).toBeFalse();
		expect(wordPattern("aaaa", "dog cat cat dog")).toBeFalse();
	});

	it("rejects two letters mapping to one word, and different lengths", () => {
		expect(wordPattern("abba", "dog dog dog dog")).toBeFalse();
		expect(wordPattern("aaa", "aa aa aa aa")).toBeFalse();
	});

	it("matches comparing first-appearance shapes on random inputs", () => {
		const random = createRandom(290);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 6);
			const pattern = random.string(n, "abc");
			const words = Array.from(
				{ length: n },
				() => ["dog", "cat", "fish"][random.int(0, 2)] ?? "dog",
			);
			expect(wordPattern(pattern, words.join(" "))).toBe(
				shape([...pattern]) === shape(words),
			);
		}
	});
});
