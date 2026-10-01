import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfPeopleThatCanBeCaughtInTag as catchMaximumAmountOfPeople } from ".";

/** Maximum bipartite matching by trying every catch for each catcher. */
const byBruteForce = (team: number[], dist: number): number => {
	const catchers = team.flatMap((m, i) => (m === 1 ? [i] : []));
	const best = (k: number, taken: Set<number>): number => {
		if (k === catchers.length) return 0;
		const catcher = catchers[k] ?? 0;
		let result = best(k + 1, taken);
		for (let j = catcher - dist; j <= catcher + dist; j++) {
			if (team[j] === 0 && !taken.has(j))
				result = Math.max(result, 1 + best(k + 1, new Set(taken).add(j)));
		}
		return result;
	};
	return best(0, new Set());
};

describe("1989. Maximum Number of People That Can Be Caught in Tag", () => {
	it("solves the examples from the problem statement", () => {
		expect(catchMaximumAmountOfPeople([0, 1, 0, 1, 0], 3)).toBe(2);
		expect(catchMaximumAmountOfPeople([1], 1)).toBe(0);
		expect(catchMaximumAmountOfPeople([0], 1)).toBe(0);
	});

	it("matches trying every catch on random teams", () => {
		const random = createRandom(1989);
		for (let run = 0; run < 200; run++) {
			const team = random.array(random.int(1, 10), 0, 1);
			const dist = random.int(1, team.length);
			expect(catchMaximumAmountOfPeople(team, dist)).toBe(
				byBruteForce(team, dist),
			);
		}
	});
});
