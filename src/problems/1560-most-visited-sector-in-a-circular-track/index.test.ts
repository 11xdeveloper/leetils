import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { mostVisitedSectorInACircularTrack as mostVisited } from ".";

/** Walks the whole marathon, counting every visit. */
const byBruteForce = (n: number, rounds: number[]): number[] => {
	const visits = new Array<number>(n + 1).fill(0);
	let at = rounds[0] ?? 1;
	visits[at] = 1;
	for (const target of rounds.slice(1)) {
		while (at !== target) {
			at = (at % n) + 1;
			visits[at] = (visits[at] ?? 0) + 1;
		}
	}
	const most = Math.max(...visits);
	return visits.flatMap((count, sector) =>
		sector > 0 && count === most ? [sector] : [],
	);
};

describe("1560. Most Visited Sector in  a Circular Track", () => {
	it("solves the examples from the problem statement", () => {
		expect(mostVisited(4, [1, 3, 1, 2])).toEqual([1, 2]);
		expect(mostVisited(2, [2, 1, 2, 1, 2, 1, 2, 1, 2])).toEqual([2]);
		expect(mostVisited(7, [1, 3, 5, 7])).toEqual([1, 2, 3, 4, 5, 6, 7]);
	});

	it("matches walking the marathon on random inputs", () => {
		const random = createRandom(1560);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 8);
			const rounds = [random.int(1, n)];
			for (let i = random.int(1, 6); i > 0; i--) {
				const last = rounds.at(-1) ?? 1;
				rounds.push(((last - 1 + random.int(1, n - 1)) % n) + 1);
			}
			expect(mostVisited(n, rounds)).toEqual(byBruteForce(n, rounds));
		}
	});
});
