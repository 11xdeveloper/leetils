import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { eatPizzas as maxWeight } from ".";

/** Tries every way of grouping the pizzas into days. */
const byBruteForce = (pizzas: number[]): number => {
	const play = (left: number[], day: number): number => {
		if (left.length === 0) return 0;
		let best = 0;
		const n = left.length;
		for (let a = 0; a < n; a++)
			for (let b = a + 1; b < n; b++)
				for (let c = b + 1; c < n; c++)
					for (let d = c + 1; d < n; d++) {
						const group = [a, b, c, d]
							.map((i) => left[i] ?? 0)
							.sort((x, y) => x - y);
						const gain = day % 2 === 1 ? (group[3] ?? 0) : (group[2] ?? 0);
						const rest = left.filter((_, i) => ![a, b, c, d].includes(i));
						best = Math.max(best, gain + play(rest, day + 1));
					}
		return best;
	};
	return play(pizzas, 1);
};

describe("3457. Eat Pizzas!", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxWeight([1, 2, 3, 4, 5, 6, 7, 8])).toBe(14);
		expect(maxWeight([2, 1, 1, 1, 1, 1, 1, 1])).toBe(3);
	});

	it("matches trying every grouping on random pizzas", () => {
		const random = createRandom(3457);
		for (let run = 0; run < 30; run++) {
			const pizzas = random.array(4 * random.int(1, 3), 1, 9);
			expect(maxWeight(pizzas)).toBe(byBruteForce(pizzas));
		}
	});
});
