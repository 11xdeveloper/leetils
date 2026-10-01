import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfWeeksForWhichYouCanWork as numberOfWeeks } from ".";

/** Memoised search over the remaining milestones and last project. */
const byBruteForce = (milestones: number[]): number => {
	const memo = new Map<string, number>();
	const best = (left: number[], last: number): number => {
		const key = `${left.join(",")}|${last}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		let result = 0;
		for (const [i, count] of left.entries()) {
			if (i === last || count === 0) continue;
			result = Math.max(
				result,
				1 +
					best(
						left.map((c, j) => (j === i ? c - 1 : c)),
						i,
					),
			);
		}
		memo.set(key, result);
		return result;
	};
	return best(milestones, -1);
};

describe("1953. Maximum Number of Weeks for Which You Can Work", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWeeks([1, 2, 3])).toBe(6);
		expect(numberOfWeeks([5, 2, 1])).toBe(7);
	});

	it("matches searching every schedule on random inputs", () => {
		const random = createRandom(1953);
		for (let run = 0; run < 150; run++) {
			const milestones = random.array(random.int(1, 4), 1, 6);
			expect(numberOfWeeks(milestones)).toBe(byBruteForce(milestones));
		}
	});
});
