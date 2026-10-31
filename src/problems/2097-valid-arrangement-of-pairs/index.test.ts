import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validArrangementOfPairs as validArrangement } from ".";

/** Checks the arrangement chains and uses exactly the given pairs. */
const expectValid = (pairs: number[][], arrangement: number[][]): void => {
	for (let i = 1; i < arrangement.length; i++)
		expect(arrangement[i]?.[0]).toBe(arrangement[i - 1]?.[1] ?? -1);
	const key = (pair: number[]): string => pair.join(",");
	expect(arrangement.map(key).sort()).toEqual(pairs.map(key).sort());
};

describe("2097. Valid Arrangement of Pairs", () => {
	it("solves the examples from the problem statement", () => {
		const examples = [
			[
				[5, 1],
				[4, 5],
				[11, 9],
				[9, 4],
			],
			[
				[1, 3],
				[3, 2],
				[2, 1],
			],
			[
				[1, 2],
				[1, 3],
				[2, 1],
			],
		];
		for (const pairs of examples) expectValid(pairs, validArrangement(pairs));
		expect(
			validArrangement([
				[5, 1],
				[4, 5],
				[11, 9],
				[9, 4],
			]),
		).toEqual([
			[11, 9],
			[9, 4],
			[4, 5],
			[5, 1],
		]);
	});

	it("arranges the pairs of random walks", () => {
		const random = createRandom(2097);
		for (let run = 0; run < 200; run++) {
			const walk = random.array(random.int(2, 15), 0, 5);
			const pairs = walk
				.slice(1)
				.map((end, i) => [walk[i] ?? 0, end])
				.sort(() => random.next() - 0.5);
			expectValid(pairs, validArrangement(pairs));
		}
	});
});
