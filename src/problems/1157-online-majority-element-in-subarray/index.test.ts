import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { OnlineMajorityElementInSubarray as MajorityChecker } from ".";

/** Counts every value in the range. */
const byBruteForce = (
	arr: number[],
	left: number,
	right: number,
	threshold: number,
): number => {
	const counts = new Map<number, number>();
	for (const value of arr.slice(left, right + 1)) {
		counts.set(value, (counts.get(value) ?? 0) + 1);
	}
	for (const [value, count] of counts) if (count >= threshold) return value;
	return -1;
};

describe("1157. Online Majority Element In Subarray", () => {
	it("solves the example from the problem statement", () => {
		const checker = new MajorityChecker([1, 1, 2, 2, 1, 1]);
		expect(checker.query(0, 5, 4)).toBe(1);
		expect(checker.query(0, 3, 3)).toBe(-1);
		expect(checker.query(2, 3, 2)).toBe(2);
	});

	it("handles a single element", () => {
		expect(new MajorityChecker([7]).query(0, 0, 1)).toBe(7);
	});

	it("matches counting on random queries", () => {
		const random = createRandom(1157);
		for (let run = 0; run < 100; run++) {
			const arr = random.array(random.int(1, 20), 1, random.int(1, 4));
			const checker = new MajorityChecker(arr);
			for (let query = 0; query < 30; query++) {
				const [a, b] = [
					random.int(0, arr.length - 1),
					random.int(0, arr.length - 1),
				];
				const [left, right] = [Math.min(a, b), Math.max(a, b)];
				const length = right - left + 1;
				const threshold = random.int(Math.floor(length / 2) + 1, length);
				expect(checker.query(left, right, threshold)).toBe(
					byBruteForce(arr, left, right, threshold),
				);
			}
		}
	});
});
