import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { constructStringWithMinimumCost as minimumCost } from ".";

/** Dynamic programming with startsWith at every position. */
const byBruteForce = (
	target: string,
	words: string[],
	costs: number[],
): number => {
	const best = new Array<number>(target.length + 1).fill(
		Number.POSITIVE_INFINITY,
	);
	best[0] = 0;
	for (let i = 0; i < target.length; i++)
		words.forEach((word, w) => {
			if (target.startsWith(word, i))
				best[i + word.length] = Math.min(
					best[i + word.length] ?? 0,
					(best[i] ?? 0) + (costs[w] ?? 0),
				);
		});
	const answer = best[target.length] ?? 0;
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};

describe("3213. Construct String with Minimum Cost", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumCost(
				"abcdef",
				["abdef", "abc", "d", "def", "ef"],
				[100, 1, 1, 10, 5],
			),
		).toBe(7);
		expect(minimumCost("aaaa", ["z", "zz", "zzz"], [1, 10, 100])).toBe(-1);
	});

	it("matches a direct dynamic program on random inputs", () => {
		const random = createRandom(3213);
		for (let run = 0; run < 300; run++) {
			const target = random.string(random.int(1, 12), "ab");
			const words = Array.from({ length: random.int(1, 6) }, () =>
				random.string(random.int(1, 4), "ab"),
			);
			const costs = random.array(words.length, 1, 9);
			expect(minimumCost(target, words, costs)).toBe(
				byBruteForce(target, words, costs),
			);
		}
	});
});
