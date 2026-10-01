import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { strongPasswordChecker } from ".";

/**
 * For passwords over 20 characters: every way to split the required
 * deletions across the runs (keeping at least one character of each, so no
 * runs merge), then replacements fix what's left.
 */
const longPasswordByBruteForce = (password: string): number => {
	const missing =
		(/[a-z]/.test(password) ? 0 : 1) +
		(/[A-Z]/.test(password) ? 0 : 1) +
		(/\d/.test(password) ? 0 : 1);
	const runs: number[] = [];
	for (let i = 0; i < password.length; ) {
		let j = i;
		while (j < password.length && password[j] === password[i]) j++;
		runs.push(j - i);
		i = j;
	}
	const deletions = password.length - 20;
	let best = Number.POSITIVE_INFINITY;
	const split = (index: number, left: number, replacements: number): void => {
		if (index === runs.length) {
			if (left === 0)
				best = Math.min(best, deletions + Math.max(missing, replacements));
			return;
		}
		const run = runs[index] ?? 0;
		for (let d = 0; d <= Math.min(left, run - 1); d++)
			split(index + 1, left - d, replacements + Math.floor((run - d) / 3));
	};
	split(0, deletions, 0);
	return best;
};

describe("420. Strong Password Checker", () => {
	it("solves the examples from the problem statement", () => {
		expect(strongPasswordChecker("a")).toBe(5);
		expect(strongPasswordChecker("aA1")).toBe(3);
		expect(strongPasswordChecker("1337C0d3")).toBe(0);
	});

	it("handles known hard cases", () => {
		expect(strongPasswordChecker("aaa111")).toBe(2);
		expect(strongPasswordChecker("1111111111")).toBe(3);
		expect(strongPasswordChecker("aaaaaaaaaaaaaaaaaaaaa")).toBe(7);
		expect(strongPasswordChecker("ABABABABABABABABABAB1")).toBe(2);
		expect(strongPasswordChecker("bbaaaaaaaaaaaaaaacccccc")).toBe(8);
	});

	it("matches splitting deletions every way on random long passwords with long runs", () => {
		const random = createRandom(420);
		for (let run = 0; run < 1000; run++) {
			// Few distinct characters make long runs likely.
			const password = random.string(
				random.int(21, 30),
				random.int(0, 1) === 0 ? "aaaAA1" : "aA1b",
			);
			const expected = longPasswordByBruteForce(password);
			// The model can't delete whole runs, so skip passwords that need to.
			if (expected === Number.POSITIVE_INFINITY) continue;
			expect(strongPasswordChecker(password)).toBe(expected);
		}
	});
});
