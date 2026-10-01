import { describe, expect, it } from "bun:test";
import { androidUnlockPatterns } from ".";

/** Checks every sequence of distinct dots directly against the rules. */
const byBruteForce = (m: number, n: number): number => {
	const position = (dot: number) =>
		[Math.floor((dot - 1) / 3), (dot - 1) % 3] as const;
	const passesOver = (a: number, b: number): number | undefined => {
		const [ar, ac] = position(a);
		const [br, bc] = position(b);
		if ((ar + br) % 2 !== 0 || (ac + bc) % 2 !== 0) return undefined;
		return ((ar + br) / 2) * 3 + (ac + bc) / 2 + 1;
	};
	let total = 0;
	const extend = (sequence: number[]): void => {
		if (sequence.length >= m) total++;
		if (sequence.length === n) return;
		for (let next = 1; next <= 9; next++) {
			if (sequence.includes(next)) continue;
			const over = passesOver(sequence.at(-1) ?? next, next);
			if (over !== undefined && over !== next && !sequence.includes(over))
				continue;
			extend([...sequence, next]);
		}
	};
	for (let start = 1; start <= 9; start++) extend([start]);
	return total;
};

describe("351. Android Unlock Patterns", () => {
	it("solves the examples from the problem statement", () => {
		expect(androidUnlockPatterns(1, 1)).toBe(9);
		expect(androidUnlockPatterns(1, 2)).toBe(65);
	});

	it("matches checking every sequence for all m and n", () => {
		for (let m = 1; m <= 9; m++) {
			for (let n = m; n <= 9; n++)
				expect(androidUnlockPatterns(m, n)).toBe(byBruteForce(m, n));
		}
	});

	it("returns 0 when m is larger than n", () => {
		expect(androidUnlockPatterns(3, 2)).toBe(0);
	});
});
