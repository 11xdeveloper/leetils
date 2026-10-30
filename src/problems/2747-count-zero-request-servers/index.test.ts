import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countZeroRequestServers as countServers } from ".";

/** Checks every server for each query. */
const byBruteForce = (
	n: number,
	logs: number[][],
	x: number,
	queries: number[],
): number[] =>
	queries.map((q) => {
		const busy = new Set(
			logs.filter(([, t = 0]) => t >= q - x && t <= q).map(([s]) => s),
		);
		return n - busy.size;
	});

describe("2747. Count Zero Request Servers", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countServers(
				3,
				[
					[1, 3],
					[2, 6],
					[1, 5],
				],
				5,
				[10, 11],
			),
		).toEqual([1, 2]);
		expect(
			countServers(
				3,
				[
					[2, 4],
					[2, 1],
					[1, 2],
					[3, 1],
				],
				2,
				[3, 4],
			),
		).toEqual([0, 1]);
	});

	it("matches checking every server on random logs", () => {
		const random = createRandom(2747);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 5);
			const logs = Array.from({ length: random.int(1, 10) }, () => [
				random.int(1, n),
				random.int(1, 15),
			]);
			const x = random.int(1, 5);
			const queries = Array.from({ length: random.int(1, 5) }, () =>
				random.int(x + 1, 20),
			);
			expect(countServers(n, logs, x, queries)).toEqual(
				byBruteForce(n, logs, x, queries),
			);
		}
	});
});
