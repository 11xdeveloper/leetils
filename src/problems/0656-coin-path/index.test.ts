import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { coinPath as cheapestJump } from ".";

const lexicographicallySmaller = (a: number[], b: number[]): boolean => {
	for (let i = 0; i < Math.min(a.length, b.length); i++)
		if (a[i] !== b[i]) return (a[i] ?? 0) < (b[i] ?? 0);
	return a.length < b.length;
};

/** Tries every path, keeping the cheapest and then the lexicographically smallest. */
const byBruteForce = (coins: number[], maxJump: number): number[] => {
	let best: [cost: number, path: number[]] | undefined;
	const search = (i: number, cost: number, path: number[]): void => {
		if (i === coins.length - 1) {
			if (
				!best ||
				cost < best[0] ||
				(cost === best[0] && lexicographicallySmaller(path, best[1]))
			)
				best = [cost, path];
			return;
		}
		for (let j = i + 1; j <= Math.min(i + maxJump, coins.length - 1); j++) {
			if (coins[j] !== -1) search(j, cost + (coins[j] ?? 0), [...path, j + 1]);
		}
	};
	search(0, coins[0] ?? 0, [1]);
	return best?.[1] ?? [];
};

describe("656. Coin Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(cheapestJump([1, 2, 4, -1, 2], 2)).toEqual([1, 3, 5]);
		expect(cheapestJump([1, 2, 4, -1, 2], 1)).toEqual([]);
	});

	it("breaks ties by the lexicographically smallest path", () => {
		expect(cheapestJump([0, 0, 0, 0, 0, 0], 3)).toEqual([1, 2, 3, 4, 5, 6]);
	});

	it("matches trying every path on random inputs", () => {
		const random = createRandom(656);
		for (let run = 0; run < 1000; run++) {
			const coins = [
				random.int(0, 3),
				...random.array(random.int(0, 7), -1, 3),
			];
			const maxJump = random.int(1, 3);
			expect(cheapestJump(coins, maxJump)).toEqual(
				byBruteForce(coins, maxJump),
			);
		}
	});
});
