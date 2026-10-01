import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splitArrayWithEqualSum as splitArray } from ".";

const byBruteForce = (nums: number[]): boolean => {
	const n = nums.length;
	const sum = (from: number, to: number) =>
		nums.slice(from, to + 1).reduce((total, num) => total + num, 0);
	for (let i = 1; i < n; i++) {
		for (let j = i + 2; j < n; j++) {
			for (let k = j + 2; k < n - 1; k++) {
				const first = sum(0, i - 1);
				if (
					sum(i + 1, j - 1) === first &&
					sum(j + 1, k - 1) === first &&
					sum(k + 1, n - 1) === first
				)
					return true;
			}
		}
	}
	return false;
};

describe("548. Split Array with Equal Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitArray([1, 2, 1, 2, 1, 2, 1])).toBeTrue();
		expect(splitArray([1, 2, 1, 2, 1, 2, 1, 2])).toBeFalse();
	});

	it("returns false when the array is too short to split", () => {
		expect(splitArray([0, 0, 0, 0, 0, 0])).toBeFalse();
		expect(splitArray([1])).toBeFalse();
	});

	it("matches trying every triple on random inputs", () => {
		const random = createRandom(548);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), -1, 2);
			expect(splitArray(nums)).toBe(byBruteForce(nums));
		}
	});
});
