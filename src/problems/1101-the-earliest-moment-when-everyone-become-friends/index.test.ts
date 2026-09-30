import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theEarliestMomentWhenEveryoneBecomeFriends as earliestAcq } from ".";

/** Checks connectivity with a search after each prefix of the sorted logs. */
const byBruteForce = (logs: number[][], n: number): number => {
	const sorted = logs.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	for (let count = 1; count <= sorted.length; count++) {
		const neighbours = Array.from({ length: n }, (): number[] => []);
		for (const [, x = 0, y = 0] of sorted.slice(0, count)) {
			neighbours[x]?.push(y);
			neighbours[y]?.push(x);
		}
		const seen = new Set([0]);
		const stack = [0];
		for (let person = stack.pop(); person !== undefined; person = stack.pop()) {
			for (const friend of neighbours[person] ?? []) {
				if (seen.has(friend)) continue;
				seen.add(friend);
				stack.push(friend);
			}
		}
		if (seen.size === n) return sorted[count - 1]?.[0] ?? -1;
	}
	return -1;
};

describe("1101. The Earliest Moment When Everyone Become Friends", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			earliestAcq(
				[
					[20190101, 0, 1],
					[20190104, 3, 4],
					[20190107, 2, 3],
					[20190211, 1, 5],
					[20190224, 2, 4],
					[20190301, 0, 3],
					[20190312, 1, 2],
					[20190322, 4, 5],
				],
				6,
			),
		).toBe(20190301);
		expect(
			earliestAcq(
				[
					[0, 2, 0],
					[1, 0, 1],
					[3, 0, 3],
					[4, 1, 2],
					[7, 3, 1],
				],
				4,
			),
		).toBe(3);
	});

	it("returns -1 when someone never meets the group", () => {
		expect(earliestAcq([[5, 0, 1]], 3)).toBe(-1);
	});

	it("matches checking connectivity after every log on random inputs", () => {
		const random = createRandom(1101);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 7);
			const pairs: number[][] = [];
			for (let x = 0; x < n; x++)
				for (let y = x + 1; y < n; y++)
					if (random.next() < 0.5) pairs.push([x, y]);
			const times = [...new Set(random.array(pairs.length, 0, 1000))];
			const logs = times.map((time, i) => [time, ...(pairs[i] ?? [])]);
			expect(earliestAcq(logs, n)).toBe(byBruteForce(logs, n));
		}
	});
});
