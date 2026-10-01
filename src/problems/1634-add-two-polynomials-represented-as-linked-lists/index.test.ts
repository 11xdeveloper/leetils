import { describe, expect, it } from "bun:test";
import { polyListFromArray, polyListToArray } from "../../structures/poly-node";
import { createRandom } from "../../testing/random";
import { addTwoPolynomialsRepresentedAsLinkedLists as addPoly } from ".";

const add = (a: [number, number][], b: [number, number][]) =>
	polyListToArray(addPoly(polyListFromArray(a), polyListFromArray(b)));

describe("1634. Add Two Polynomials Represented as Linked Lists", () => {
	it("solves the examples from the problem statement", () => {
		expect(add([[1, 1]], [[1, 0]])).toEqual([
			[1, 1],
			[1, 0],
		]);
		expect(
			add(
				[
					[2, 2],
					[4, 1],
					[3, 0],
				],
				[
					[3, 2],
					[-4, 1],
					[-1, 0],
				],
			),
		).toEqual([
			[5, 2],
			[2, 0],
		]);
		expect(add([[1, 2]], [[-1, 2]])).toEqual([]);
	});

	it("handles empty polynomials", () => {
		expect(add([], [])).toEqual([]);
		expect(add([], [[3, 4]])).toEqual([[3, 4]]);
	});

	it("matches adding coefficient arrays on random polynomials", () => {
		const random = createRandom(1634);
		const randomPoly = () => {
			const terms: [number, number][] = [];
			for (let power = 6; power >= 0; power--) {
				const coefficient = random.int(-2, 2);
				if (coefficient !== 0 && random.int(0, 1) === 1)
					terms.push([coefficient, power]);
			}
			return terms;
		};
		for (let run = 0; run < 300; run++) {
			const [a, b] = [randomPoly(), randomPoly()];
			const sums = new Array<number>(7).fill(0);
			for (const [coefficient, power] of [...a, ...b])
				sums[power] = (sums[power] ?? 0) + coefficient;
			const expected: [number, number][] = [];
			for (let power = 6; power >= 0; power--)
				if (sums[power]) expected.push([sums[power] ?? 0, power]);
			expect(add(a, b)).toEqual(expected);
		}
	});
});
