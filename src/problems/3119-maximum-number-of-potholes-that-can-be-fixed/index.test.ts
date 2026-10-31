import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfPotholesThatCanBeFixed as maxPotholes } from ".";

/** A knapsack over how much of each stretch to fix. */
const byBruteForce = (road: string, budget: number): number => {
	const stretches = road
		.split(".")
		.filter(Boolean)
		.map((s) => s.length);
	let best = new Array<number>(budget + 1).fill(0);
	for (const length of stretches) {
		const next = [...best];
		for (let spent = 0; spent <= budget; spent++)
			for (let take = 1; take <= length && spent + take + 1 <= budget; take++)
				next[spent + take + 1] = Math.max(
					next[spent + take + 1] ?? 0,
					(best[spent] ?? 0) + take,
				);
		best = next;
	}
	return Math.max(...best);
};

describe("3119. Maximum Number of Potholes That Can Be Fixed", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPotholes("..", 5)).toBe(0);
		expect(maxPotholes("..xxxxx", 4)).toBe(3);
		expect(maxPotholes("x.x.xxx...x", 14)).toBe(6);
	});

	it("matches a knapsack on random roads", () => {
		const random = createRandom(3119);
		for (let run = 0; run < 300; run++) {
			const road = random.string(random.int(1, 15), "x.");
			const budget = random.int(1, 15);
			expect(maxPotholes(road, budget)).toBe(byBruteForce(road, budget));
		}
	});
});
