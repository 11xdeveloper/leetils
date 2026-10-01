import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestWordDistance } from "../0243-shortest-word-distance";
import { ShortestWordDistanceII } from ".";

describe("244. Shortest Word Distance II", () => {
	it("solves the example from the problem statement", () => {
		const distance = new ShortestWordDistanceII([
			"practice",
			"makes",
			"perfect",
			"coding",
			"makes",
		]);
		expect(distance.shortest("coding", "practice")).toBe(3);
		expect(distance.shortest("makes", "coding")).toBe(1);
	});

	it("matches Shortest Word Distance for every pair of words on random lists", () => {
		const random = createRandom(244);
		const vocabulary = ["a", "b", "c", "d"];
		for (let run = 0; run < 200; run++) {
			const words = Array.from(
				{ length: random.int(2, 20) },
				() => vocabulary[random.int(0, 3)] ?? "a",
			);
			const distance = new ShortestWordDistanceII(words);
			const present = [...new Set(words)];
			for (const a of present) {
				for (const b of present) {
					if (a !== b)
						expect(distance.shortest(a, b)).toBe(
							shortestWordDistance(words, a, b),
						);
				}
			}
		}
	});
});
