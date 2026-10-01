import { describe, expect, it } from "bun:test";
import { waterBottles as numWaterBottles } from ".";

/** Exchanges one bottle at a time. */
const byBruteForce = (full: number, exchange: number): number => {
	let [drunk, bottles, empty] = [0, full, 0];
	while (bottles > 0) {
		bottles--;
		drunk++;
		empty++;
		if (empty === exchange) [bottles, empty] = [bottles + 1, 0];
	}
	return drunk;
};

describe("1518. Water Bottles", () => {
	it("solves the examples from the problem statement", () => {
		expect(numWaterBottles(9, 3)).toBe(13);
		expect(numWaterBottles(15, 4)).toBe(19);
	});

	it("matches exchanging one at a time for every input", () => {
		for (let full = 1; full <= 100; full++) {
			for (let exchange = 2; exchange <= 100; exchange++) {
				expect(numWaterBottles(full, exchange)).toBe(
					byBruteForce(full, exchange),
				);
			}
		}
	});
});
