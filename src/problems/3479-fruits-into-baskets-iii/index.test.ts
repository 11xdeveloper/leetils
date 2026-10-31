import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { fruitsIntoBasketsIII as numOfUnplacedFruits } from ".";

/** Simulates with a linear scan. */
const byBruteForce = (fruits: number[], baskets: number[]): number => {
	const used = baskets.map(() => false);
	let unplaced = 0;
	for (const fruit of fruits) {
		const at = baskets.findIndex((c, i) => !used[i] && c >= fruit);
		if (at === -1) unplaced++;
		else used[at] = true;
	}
	return unplaced;
};

describe("3479. Fruits Into Baskets III", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfUnplacedFruits([4, 2, 5], [3, 5, 4])).toBe(1);
		expect(numOfUnplacedFruits([3, 6, 1], [6, 4, 7])).toBe(0);
	});

	it("matches a linear scan on random inputs", () => {
		const random = createRandom(3479);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const fruits = random.array(n, 1, 9);
			const baskets = random.array(n, 1, 9);
			expect(numOfUnplacedFruits(fruits, baskets)).toBe(
				byBruteForce(fruits, baskets),
			);
		}
	});
});
