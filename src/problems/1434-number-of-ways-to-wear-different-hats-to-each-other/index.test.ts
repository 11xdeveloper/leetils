import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWaysToWearDifferentHatsToEachOther as numberWays } from ".";

/** Gives each person in turn every hat they like that's still free. */
const byBruteForce = (hats: number[][]): number => {
	const used = new Set<number>();
	const assign = (person: number): number => {
		if (person === hats.length) return 1;
		let ways = 0;
		for (const hat of hats[person] ?? []) {
			if (used.has(hat)) continue;
			used.add(hat);
			ways += assign(person + 1);
			used.delete(hat);
		}
		return ways;
	};
	return assign(0);
};

describe("1434. Number of Ways to Wear Different Hats to Each Other", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberWays([[3, 4], [4, 5], [5]])).toBe(1);
		expect(
			numberWays([
				[3, 5, 1],
				[3, 5],
			]),
		).toBe(4);
		expect(
			numberWays([
				[1, 2, 3, 4],
				[1, 2, 3, 4],
				[1, 2, 3, 4],
				[1, 2, 3, 4],
			]),
		).toBe(24);
	});

	it("reduces modulo 10^9 + 7 for ten people liking every hat", () => {
		const all = Array.from({ length: 40 }, (_, i) => i + 1);
		let expected = 1n;
		for (let hat = 31n; hat <= 40n; hat++) expected *= hat;
		expect(numberWays(new Array(10).fill(all))).toBe(
			Number(expected % 1_000_000_007n),
		);
	});

	it("matches assigning hats person by person on random inputs", () => {
		const random = createRandom(1434);
		for (let run = 0; run < 200; run++) {
			const hats = Array.from({ length: random.int(1, 5) }, () => [
				...new Set(random.array(random.int(1, 5), 1, 8)),
			]);
			expect(numberWays(hats)).toBe(byBruteForce(hats));
		}
	});
});
