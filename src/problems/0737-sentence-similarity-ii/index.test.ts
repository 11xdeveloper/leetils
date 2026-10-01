import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sentenceSimilarityII as areSentencesSimilarTwo } from ".";

describe("737. Sentence Similarity II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			areSentencesSimilarTwo(
				["great", "acting", "skills"],
				["fine", "drama", "talent"],
				[
					["great", "good"],
					["fine", "good"],
					["drama", "acting"],
					["skills", "talent"],
				],
			),
		).toBeTrue();
		expect(
			areSentencesSimilarTwo(
				["I", "love", "leetcode"],
				["I", "love", "onepiece"],
				[
					["manga", "onepiece"],
					["platform", "anime"],
					["leetcode", "platform"],
					["anime", "manga"],
				],
			),
		).toBeTrue();
		expect(
			areSentencesSimilarTwo(
				["I", "love", "leetcode"],
				["I", "love", "onepiece"],
				[
					["manga", "hunterXhunter"],
					["platform", "anime"],
					["leetcode", "platform"],
					["anime", "manga"],
				],
			),
		).toBeFalse();
	});

	it("matches searching the similarity graph on random inputs", () => {
		const random = createRandom(737);
		const words = ["a", "b", "c", "d", "e", "f"];
		for (let run = 0; run < 500; run++) {
			const pairs = Array.from({ length: random.int(0, 5) }, () => [
				words[random.int(0, 5)] ?? "a",
				words[random.int(0, 5)] ?? "a",
			]);
			const connected = (x: string, y: string) => {
				const seen = new Set([x]);
				const queue = [x];
				for (const word of queue) {
					for (const [a, b] of pairs) {
						const other = a === word ? b : b === word ? a : undefined;
						if (other && !seen.has(other)) {
							seen.add(other);
							queue.push(other);
						}
					}
				}
				return seen.has(y);
			};
			const length = random.int(1, 4);
			const s1 = Array.from({ length }, () => words[random.int(0, 5)] ?? "a");
			const s2 = Array.from({ length }, () => words[random.int(0, 5)] ?? "a");
			expect(areSentencesSimilarTwo(s1, s2, pairs)).toBe(
				s1.every((word, i) => connected(word, s2[i] ?? "")),
			);
		}
	});
});
