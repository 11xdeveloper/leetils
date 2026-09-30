import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { synonymousSentences as generateSentences } from ".";

/** Explores sentences by swapping one word at a time along a synonym pair. */
const byBruteForce = (synonyms: string[][], text: string): string[] => {
	const seen = new Set([text]);
	const stack = [text];
	for (
		let sentence = stack.pop();
		sentence !== undefined;
		sentence = stack.pop()
	) {
		const words = sentence.split(" ");
		words.forEach((word, i) => {
			for (const [a, b] of synonyms) {
				const other = word === a ? b : word === b ? a : undefined;
				if (other === undefined) continue;
				const next = [...words.slice(0, i), other, ...words.slice(i + 1)].join(
					" ",
				);
				if (seen.has(next)) continue;
				seen.add(next);
				stack.push(next);
			}
		});
	}
	return [...seen].sort();
};

describe("1258. Synonymous Sentences", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			generateSentences(
				[
					["happy", "joy"],
					["sad", "sorrow"],
					["joy", "cheerful"],
				],
				"I am happy today but was sad yesterday",
			),
		).toEqual([
			"I am cheerful today but was sad yesterday",
			"I am cheerful today but was sorrow yesterday",
			"I am happy today but was sad yesterday",
			"I am happy today but was sorrow yesterday",
			"I am joy today but was sad yesterday",
			"I am joy today but was sorrow yesterday",
		]);
		expect(
			generateSentences(
				[
					["happy", "joy"],
					["cheerful", "glad"],
				],
				"I am happy today but was sad yesterday",
			),
		).toEqual([
			"I am happy today but was sad yesterday",
			"I am joy today but was sad yesterday",
		]);
	});

	it("matches swapping one word at a time on random inputs", () => {
		const random = createRandom(1258);
		const vocabulary = ["a", "b", "c", "d", "e", "f"];
		for (let run = 0; run < 200; run++) {
			const pairs = new Set<string>();
			for (let i = random.int(0, 4); i > 0; i--) {
				const [x, y] = [random.int(0, 5), random.int(0, 5)];
				if (x !== y)
					pairs.add(
						`${vocabulary[Math.min(x, y)]} ${vocabulary[Math.max(x, y)]}`,
					);
			}
			const synonyms = [...pairs].map((pair) => pair.split(" "));
			const text = Array.from(
				{ length: random.int(1, 4) },
				() => vocabulary[random.int(0, 5)] ?? "",
			).join(" ");
			expect(generateSentences(synonyms, text)).toEqual(
				byBruteForce(synonyms, text),
			);
		}
	});
});
