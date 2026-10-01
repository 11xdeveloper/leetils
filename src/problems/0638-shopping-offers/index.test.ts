import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shoppingOffers } from ".";

/** Unbounded knapsack over every needs vector, filled in order. */
const byTable = (
	price: number[],
	special: number[][],
	needs: number[],
): number => {
	const n = price.length;
	const states: number[][] = [[]];
	for (const need of needs)
		states.splice(
			0,
			states.length,
			...states.flatMap((state) =>
				Array.from({ length: need + 1 }, (_, q) => [...state, q]),
			),
		);
	const cost = new Map<string, number>();
	for (const state of states) {
		let best = state.reduce(
			(total, quantity, i) => total + quantity * (price[i] ?? 0),
			0,
		);
		// An offer with no items never helps, and would refer to this state before it's filled in.
		for (const offer of special.filter((offer) =>
			offer.slice(0, n).some((quantity) => quantity > 0),
		)) {
			const before = state.map((quantity, i) => quantity - (offer[i] ?? 0));
			if (before.every((quantity) => quantity >= 0))
				best = Math.min(best, (cost.get(before.join()) ?? 0) + (offer[n] ?? 0));
		}
		cost.set(state.join(), best);
	}
	return cost.get(needs.join()) ?? 0;
};

describe("638. Shopping Offers", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shoppingOffers(
				[2, 5],
				[
					[3, 0, 5],
					[1, 2, 10],
				],
				[3, 2],
			),
		).toBe(14);
		expect(
			shoppingOffers(
				[2, 3, 4],
				[
					[1, 1, 0, 4],
					[2, 2, 1, 9],
				],
				[1, 2, 1],
			),
		).toBe(11);
	});

	it("matches filling a table of every needs vector on random inputs", () => {
		const random = createRandom(638);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 3);
			const price = random.array(n, 1, 10);
			const special = Array.from({ length: random.int(0, 4) }, () => [
				...random.array(n, 0, 3),
				random.int(1, 30),
			]);
			const needs = random.array(n, 0, 4);
			expect(shoppingOffers(price, special, needs)).toBe(
				byTable(price, special, needs),
			);
		}
	});
});
