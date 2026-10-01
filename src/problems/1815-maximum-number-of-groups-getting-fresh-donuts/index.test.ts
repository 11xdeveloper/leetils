import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfGroupsGettingFreshDonuts as maxHappyGroups } from ".";

/** Tries every order of the groups. */
const byBruteForce = (batchSize: number, groups: number[]): number => {
	let best = 0;
	const serve = (left: number[], served: number, happy: number) => {
		if (left.length === 0) {
			best = Math.max(best, happy);
			return;
		}
		for (const [i, group] of left.entries()) {
			serve(
				left.filter((_, j) => j !== i),
				served + group,
				happy + (served % batchSize === 0 ? 1 : 0),
			);
		}
	};
	serve(groups, 0, 0);
	return best;
};

describe("1815. Maximum Number of Groups Getting Fresh Donuts", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxHappyGroups(3, [1, 2, 3, 4, 5, 6])).toBe(4);
		expect(maxHappyGroups(4, [1, 3, 2, 5, 2, 2, 1, 6])).toBe(4);
	});

	it("matches trying every order on random inputs", () => {
		const random = createRandom(1815);
		for (let run = 0; run < 100; run++) {
			const batchSize = random.int(1, 9);
			const groups = random.array(random.int(1, 7), 1, 20);
			expect(maxHappyGroups(batchSize, groups)).toBe(
				byBruteForce(batchSize, groups),
			);
		}
	});

	it("handles 30 groups", () => {
		expect(
			maxHappyGroups(
				9,
				Array.from({ length: 30 }, (_, i) => i + 1),
			),
		).toBeGreaterThan(0);
	});
});
