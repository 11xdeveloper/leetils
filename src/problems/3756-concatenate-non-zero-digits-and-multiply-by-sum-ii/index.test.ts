import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { concatenateNonZeroDigitsAndMultiplyBySumII as sumAndMultiply } from ".";

/** Builds each substring's number with BigInt. */
const byBruteForce = (s: string, queries: number[][]): number[] =>
	queries.map(([l = 0, r = 0]) => {
		const digits = s.slice(l, r + 1).replaceAll("0", "");
		const sum = [...digits].reduce((t, d) => t + Number(d), 0);
		return Number((BigInt(digits || "0") * BigInt(sum)) % 1_000_000_007n);
	});

describe("3756. Concatenate Non-Zero Digits and Multiply by Sum II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sumAndMultiply("10203004", [
				[0, 7],
				[1, 3],
				[4, 6],
			]),
		).toEqual([12340, 4, 9]);
		expect(
			sumAndMultiply("1000", [
				[0, 3],
				[1, 1],
			]),
		).toEqual([1, 0]);
	});

	it("matches BigInt arithmetic on random strings", () => {
		const random = createRandom(3756);
		for (let run = 0; run < 100; run++) {
			const s = random.string(random.int(1, 40), "0123456789");
			const queries = Array.from({ length: 10 }, () => {
				const l = random.int(0, s.length - 1);
				return [l, random.int(l, s.length - 1)];
			});
			expect(sumAndMultiply(s, queries)).toEqual(byBruteForce(s, queries));
		}
	});
});
