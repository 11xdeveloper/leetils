import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arrayOfDoubledPairs as canReorderDoubled } from ".";

/** Pairs the first element with every possible partner, recursively. */
const byBruteForce = (arr: number[]): boolean => {
	if (arr.length === 0) return true;
	const [first = 0, ...rest] = arr;
	return rest.some(
		(other, i) =>
			(other === 2 * first || first === 2 * other) &&
			byBruteForce(rest.filter((_, j) => j !== i)),
	);
};

describe("954. Array of Doubled Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(canReorderDoubled([3, 1, 3, 6])).toBeFalse();
		expect(canReorderDoubled([2, 1, 2, 6])).toBeFalse();
		expect(canReorderDoubled([4, -2, 2, -4])).toBeTrue();
	});

	it("matches trying every pairing on random inputs", () => {
		const random = createRandom(954);
		for (let run = 0; run < 500; run++) {
			const half = random.array(random.int(1, 4), -4, 4);
			const arr = random.int(0, 1)
				? [...half, ...half.map((x) => 2 * x)]
				: random.array(2 * half.length, -8, 8);
			const shuffled = arr.sort(() => random.next() - 0.5);
			expect(canReorderDoubled(shuffled)).toBe(byBruteForce(shuffled));
		}
	});
});
