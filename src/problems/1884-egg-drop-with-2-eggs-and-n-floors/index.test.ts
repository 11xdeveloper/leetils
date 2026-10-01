import { describe, expect, it } from "bun:test";
import { eggDropWith2EggsAndNFloors as twoEggDrop } from ".";

describe("1884. Egg Drop With 2 Eggs and N Floors", () => {
	it("solves the examples from the problem statement", () => {
		expect(twoEggDrop(2)).toBe(2);
		expect(twoEggDrop(100)).toBe(14);
	});

	it("matches the worst-case dynamic program for every n up to 1000", () => {
		// best[f]: drops needed for f floors with two eggs; one egg needs f drops.
		const best = [0];
		for (let floors = 1; floors <= 1000; floors++) {
			let worst = Infinity;
			for (let drop = 1; drop <= floors; drop++)
				worst = Math.min(
					worst,
					1 + Math.max(drop - 1, best[floors - drop] ?? 0),
				);
			best.push(worst);
			expect(twoEggDrop(floors)).toBe(worst);
		}
	});
});
