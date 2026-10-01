import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordLadder } from "../0127-word-ladder";
import { minimumGeneticMutation } from ".";

describe("433. Minimum Genetic Mutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumGeneticMutation("AACCGGTT", "AACCGGTA", ["AACCGGTA"])).toBe(
			1,
		);
		expect(
			minimumGeneticMutation("AACCGGTT", "AAACGGTA", [
				"AACCGGTA",
				"AACCGCTA",
				"AAACGGTA",
			]),
		).toBe(2);
	});

	it("needs no mutations when the genes already match", () => {
		expect(minimumGeneticMutation("AACCGGTT", "AACCGGTT", [])).toBe(0);
	});

	it("matches Word Ladder, which counts genes instead of mutations, on random banks", () => {
		const random = createRandom(433);
		for (let run = 0; run < 300; run++) {
			const gene = () => random.string(8, "AC");
			const start = gene();
			const bank = [
				...new Set(Array.from({ length: random.int(0, 20) }, gene)),
			];
			const end = bank[random.int(0, Math.max(0, bank.length - 1))] ?? gene();
			if (start === end) continue;
			// Word Ladder only uses lowercase letters, so map the genes into them.
			const lower = (g: string) => g.toLowerCase();
			const ladder = wordLadder(lower(start), lower(end), bank.map(lower));
			expect(minimumGeneticMutation(start, end, bank)).toBe(
				ladder === 0 ? -1 : ladder - 1,
			);
		}
	});
});
