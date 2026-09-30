import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lastStoneWeight } from ".";

describe("1046. Last Stone Weight", () => {
	it("solves the examples from the problem statement", () => {
		expect(lastStoneWeight([2, 7, 4, 1, 8, 1])).toBe(1);
		expect(lastStoneWeight([1])).toBe(1);
		expect(lastStoneWeight([2, 2])).toBe(0);
	});

	it("matches re-sorting each round on random stones", () => {
		const random = createRandom(1046);
		for (let run = 0; run < 1000; run++) {
			const stones = random.array(random.int(1, 12), 1, 30);
			let pile = [...stones];
			while (pile.length > 1) {
				pile.sort((a, b) => b - a);
				const [a = 0, b = 0, ...rest] = pile;
				pile = a === b ? rest : [a - b, ...rest];
			}
			expect(lastStoneWeight(stones)).toBe(pile[0] ?? 0);
		}
	});
});
