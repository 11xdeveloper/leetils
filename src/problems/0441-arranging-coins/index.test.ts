import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arrangingCoins } from ".";

const bySimulation = (n: number): number => {
	let rows = 0;
	let left = n;
	while (left >= rows + 1) {
		rows++;
		left -= rows;
	}
	return rows;
};

describe("441. Arranging Coins", () => {
	it("solves the examples from the problem statement", () => {
		expect(arrangingCoins(5)).toBe(2);
		expect(arrangingCoins(8)).toBe(3);
	});

	it("matches building rows for every n up to 10,000, and exact triangular numbers", () => {
		for (let n = 1; n <= 10_000; n++)
			expect(arrangingCoins(n)).toBe(bySimulation(n));
		for (let k = 1; k <= 65_000; k += 97) {
			const triangle = (k * (k + 1)) / 2;
			expect(arrangingCoins(triangle)).toBe(k);
			expect(arrangingCoins(triangle - 1)).toBe(k - 1);
		}
	});

	it("handles the largest 32-bit integer", () => {
		expect(arrangingCoins(2 ** 31 - 1)).toBe(65535);
	});

	it("matches building rows on random large inputs", () => {
		const random = createRandom(441);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 2 ** 31 - 1);
			expect(arrangingCoins(n)).toBe(bySimulation(n));
		}
	});
});
