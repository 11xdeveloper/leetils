import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sentenceSimilarityIII as areSentencesSimilar } from ".";

/** Tries inserting every run of the longer sentence's words. */
const byBruteForce = (a: string, b: string): boolean => {
	const [x, y] = [a.split(" "), b.split(" ")];
	const [shorter, longer] = x.length <= y.length ? [x, y] : [y, x];
	const gap = longer.length - shorter.length;
	for (let at = 0; at <= shorter.length; at++) {
		if (
			[
				...shorter.slice(0, at),
				...longer.slice(at, at + gap),
				...shorter.slice(at),
			].join(" ") === longer.join(" ")
		)
			return true;
	}
	return false;
};

describe("1813. Sentence Similarity III", () => {
	it("solves the examples from the problem statement", () => {
		expect(areSentencesSimilar("My name is Haley", "My Haley")).toBeTrue();
		expect(areSentencesSimilar("of", "A lot of words")).toBeFalse();
		expect(areSentencesSimilar("Eating right now", "Eating")).toBeTrue();
	});

	it("matches trying every insertion on random sentences", () => {
		const random = createRandom(1813);
		const sentence = () =>
			Array.from({ length: random.int(1, 5) }, () =>
				random.string(1, "ab"),
			).join(" ");
		for (let run = 0; run < 300; run++) {
			const [a, b] = [sentence(), sentence()];
			expect(areSentencesSimilar(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
