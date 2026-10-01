import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { formLargestIntegerWithDigitsThatAddUpToTarget as largestNumber } from ".";

/** Dynamic programming over totals that keeps the best string itself. */
const byBruteForce = (cost: number[], target: number): string => {
	const better = (a: string | undefined, b: string | undefined) =>
		b === undefined ||
		(a !== undefined &&
			(a.length > b.length || (a.length === b.length && a > b)));
	const best: (string | undefined)[] = new Array(target + 1).fill(undefined);
	best[0] = "";
	for (let total = 1; total <= target; total++) {
		cost.forEach((price, i) => {
			const before = best[total - price];
			if (price > total || before === undefined) return;
			const digits = [...before, String(i + 1)].sort().reverse().join("");
			if (better(digits, best[total])) best[total] = digits;
		});
	}
	return best[target] || "0";
};

describe("1449. Form Largest Integer With Digits That Add up to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestNumber([4, 3, 2, 5, 6, 7, 2, 5, 5], 9)).toBe("7772");
		expect(largestNumber([7, 6, 5, 5, 5, 6, 8, 7, 8], 12)).toBe("85");
		expect(largestNumber([2, 4, 6, 2, 4, 6, 4, 4, 4], 5)).toBe("0");
	});

	it("handles the largest target", () => {
		expect(largestNumber(new Array<number>(9).fill(1), 5000)).toBe(
			"9".repeat(5000),
		);
	});

	it("matches keeping the best string for each total on random inputs", () => {
		const random = createRandom(1449);
		for (let run = 0; run < 200; run++) {
			const cost = random.array(9, 1, 8);
			const target = random.int(1, 25);
			expect(largestNumber(cost, target)).toBe(byBruteForce(cost, target));
		}
	});
});
