import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { previousPermutationWithOneSwap as prevPermOpt1 } from ".";

const compare = (a: number[], b: number[]): number => {
	for (let i = 0; i < a.length; i++)
		if (a[i] !== b[i]) return (a[i] ?? 0) - (b[i] ?? 0);
	return 0;
};

describe("1053. Previous Permutation With One Swap", () => {
	it("solves the examples from the problem statement", () => {
		expect(prevPermOpt1([3, 2, 1])).toEqual([3, 1, 2]);
		expect(prevPermOpt1([1, 1, 5])).toEqual([1, 1, 5]);
		expect(prevPermOpt1([1, 9, 4, 6, 7])).toEqual([1, 7, 4, 6, 9]);
	});

	it("matches trying every swap on random arrays", () => {
		const random = createRandom(1053);
		for (let run = 0; run < 1000; run++) {
			const arr = random.array(random.int(1, 8), 1, 5);
			let best = arr;
			for (let i = 0; i < arr.length; i++) {
				for (let j = i + 1; j < arr.length; j++) {
					const swapped = [...arr];
					[swapped[i], swapped[j]] = [arr[j] ?? 0, arr[i] ?? 0];
					if (
						compare(swapped, arr) < 0 &&
						(best === arr || compare(swapped, best) > 0)
					)
						best = swapped;
				}
			}
			expect(prevPermOpt1(arr)).toEqual(best);
		}
	});
});
