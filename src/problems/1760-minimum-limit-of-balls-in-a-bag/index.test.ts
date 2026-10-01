import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumLimitOfBallsInABag as minimumSize } from ".";

/** Tries splitting bags in every way, memoised by the sorted bags and operations left. */
const byBruteForce = (nums: number[], operations: number): number => {
	const memo = new Map<string, number>();
	const best = (bags: number[], left: number): number => {
		const key = `${bags.toSorted((a, b) => a - b).join(",")}|${left}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		let result = Math.max(...bags);
		if (left > 0) {
			for (const [i, bag] of bags.entries()) {
				for (let part = 1; part <= bag / 2; part++) {
					const next = [
						...bags.slice(0, i),
						...bags.slice(i + 1),
						part,
						bag - part,
					];
					result = Math.min(result, best(next, left - 1));
				}
			}
		}
		memo.set(key, result);
		return result;
	};
	return best(nums, operations);
};

describe("1760. Minimum Limit of Balls in a Bag", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSize([9], 2)).toBe(3);
		expect(minimumSize([2, 4, 8, 2], 4)).toBe(2);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1760);
		for (let run = 0; run < 60; run++) {
			const nums = random.array(random.int(1, 3), 1, 8);
			const operations = random.int(1, 3);
			expect(minimumSize(nums, operations)).toBe(
				byBruteForce(nums, operations),
			);
		}
	});
});
