import { describe, expect, it } from "bun:test";
import { sentenceSimilarity as areSentencesSimilar } from ".";

describe("734. Sentence Similarity", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			areSentencesSimilar(
				["great", "acting", "skills"],
				["fine", "drama", "talent"],
				[
					["great", "fine"],
					["drama", "acting"],
					["skills", "talent"],
				],
			),
		).toBeTrue();
		expect(areSentencesSimilar(["great"], ["great"], [])).toBeTrue();
		expect(
			areSentencesSimilar(
				["great"],
				["doubleplus", "good"],
				[["great", "doubleplus"]],
			),
		).toBeFalse();
	});

	it("isn't transitive", () => {
		expect(
			areSentencesSimilar(
				["a"],
				["c"],
				[
					["a", "b"],
					["b", "c"],
				],
			),
		).toBeFalse();
	});
});
