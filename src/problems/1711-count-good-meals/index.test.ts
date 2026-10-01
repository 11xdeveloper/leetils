import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countGoodMeals as countPairs } from ".";

describe("1711. Count Good Meals", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPairs([1, 3, 5, 7, 9])).toBe(4);
		expect(countPairs([1, 1, 1, 3, 3, 3, 7])).toBe(15);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1711);
		for (let run = 0; run < 200; run++) {
			const values = random.array(random.int(1, 15), 0, 20);
			let pairs = 0;
			for (let i = 0; i < values.length; i++) {
				for (let j = i + 1; j < values.length; j++) {
					const sum = (values[i] ?? 0) + (values[j] ?? 0);
					if (sum > 0 && (sum & (sum - 1)) === 0) pairs++;
				}
			}
			expect(countPairs(values)).toBe(pairs);
		}
	});

	it("reduces large counts modulo 10^9 + 7", () => {
		expect(countPairs(new Array(100000).fill(1 << 20))).toBe(
			4999950000 % 1_000_000_007,
		);
	});
});
