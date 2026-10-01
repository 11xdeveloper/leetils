import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { createMaximumNumber } from ".";

/** Tries every choice of positions from both arrays and every interleaving. */
const byBruteForce = (a: number[], b: number[], k: number): string => {
	const subsequences = (digits: number[]): number[][] => {
		const all: number[][] = [];
		for (let mask = 0; mask < 1 << digits.length; mask++)
			all.push(digits.filter((_, i) => mask & (1 << i)));
		return all;
	};
	const interleavings = (x: number[], y: number[]): number[][] =>
		x.length === 0
			? [y]
			: y.length === 0
				? [x]
				: [
						...interleavings(x.slice(1), y).map((rest) => [x[0] ?? 0, ...rest]),
						...interleavings(x, y.slice(1)).map((rest) => [y[0] ?? 0, ...rest]),
					];
	let best = "";
	for (const x of subsequences(a)) {
		for (const y of subsequences(b)) {
			if (x.length + y.length !== k) continue;
			for (const merged of interleavings(x, y)) {
				const text = merged.join("");
				if (text > best) best = text;
			}
		}
	}
	return best;
};

describe("321. Create Maximum Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(createMaximumNumber([3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5)).toEqual([
			9, 8, 6, 5, 3,
		]);
		expect(createMaximumNumber([6, 7], [6, 0, 4], 5)).toEqual([6, 7, 6, 0, 4]);
		expect(createMaximumNumber([3, 9], [8, 9], 3)).toEqual([9, 8, 9]);
	});

	it("breaks ties by looking at what follows", () => {
		expect(createMaximumNumber([6, 7], [6, 0, 4], 5)).toEqual([6, 7, 6, 0, 4]);
		expect(
			createMaximumNumber([2, 5, 6, 4, 4, 0], [7, 3, 8, 0, 6, 5, 7, 6, 2], 15),
		).toEqual([7, 3, 8, 2, 5, 6, 4, 4, 0, 6, 5, 7, 6, 2, 0]);
	});

	it("matches trying every choice and interleaving on random inputs", () => {
		const random = createRandom(321);
		for (let run = 0; run < 200; run++) {
			const a = random.array(random.int(0, 4), 0, 9);
			const b = random.array(random.int(0, 4), 0, 9);
			if (a.length + b.length === 0) continue;
			const k = random.int(1, a.length + b.length);
			expect(createMaximumNumber(a, b, k).join("")).toBe(byBruteForce(a, b, k));
		}
	});
});
