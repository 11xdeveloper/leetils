import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { profitableSchemes } from ".";

const byBruteForce = (
	n: number,
	minProfit: number,
	group: number[],
	profit: number[],
): number => {
	let count = 0;
	for (let mask = 0; mask < 1 << group.length; mask++) {
		let members = 0;
		let earned = 0;
		for (let i = 0; i < group.length; i++) {
			if (mask & (1 << i)) {
				members += group[i] ?? 0;
				earned += profit[i] ?? 0;
			}
		}
		if (members <= n && earned >= minProfit) count++;
	}
	return count;
};

describe("879. Profitable Schemes", () => {
	it("solves the examples from the problem statement", () => {
		expect(profitableSchemes(5, 3, [2, 2], [2, 3])).toBe(2);
		expect(profitableSchemes(10, 5, [2, 3, 5], [6, 7, 8])).toBe(7);
	});

	it("matches trying every set of crimes on random inputs", () => {
		const random = createRandom(879);
		for (let run = 0; run < 500; run++) {
			const crimes = random.int(1, 10);
			const group = random.array(crimes, 1, 5);
			const profit = random.array(crimes, 0, 5);
			const n = random.int(1, 15);
			const minProfit = random.int(0, 10);
			expect(profitableSchemes(n, minProfit, group, profit)).toBe(
				byBruteForce(n, minProfit, group, profit),
			);
		}
	});
});
