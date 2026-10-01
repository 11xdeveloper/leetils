import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { decreaseElementsToMakeArrayZigzag as movesToMakeZigzag } from ".";

/** Tries lowering each element by every amount up to its value plus one. */
const byBruteForce = (nums: number[]): number => {
	const isZigzag = (a: number[]) =>
		[0, 1].some((peak) =>
			a.every(
				(value, i) =>
					i % 2 !== peak ||
					((a[i - 1] ?? -Infinity) < value && (a[i + 1] ?? -Infinity) < value),
			),
		);
	let best = Infinity;
	const lowered = [...nums];
	const tryFrom = (i: number, moves: number): void => {
		if (moves >= best) return;
		if (i === nums.length) {
			if (isZigzag(lowered)) best = moves;
			return;
		}
		for (let by = 0; by <= Math.max(...nums) + 1; by++) {
			lowered[i] = (nums[i] ?? 0) - by;
			tryFrom(i + 1, moves + by);
		}
		lowered[i] = nums[i] ?? 0;
	};
	tryFrom(0, 0);
	return best;
};

describe("1144. Decrease Elements To Make Array Zigzag", () => {
	it("solves the examples from the problem statement", () => {
		expect(movesToMakeZigzag([1, 2, 3])).toBe(2);
		expect(movesToMakeZigzag([9, 6, 1, 6, 2])).toBe(4);
	});

	it("needs no moves for one element", () => {
		expect(movesToMakeZigzag([7])).toBe(0);
	});

	it("matches trying every amount of lowering on random inputs", () => {
		const random = createRandom(1144);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 5), 1, 4);
			expect(movesToMakeZigzag(nums)).toBe(byBruteForce(nums));
		}
	});
});
