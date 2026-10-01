import { describe, expect, it } from "bun:test";
import { crackingTheSafe } from ".";

const opensEverything = (sequence: string, n: number, k: number): boolean => {
	const found = new Set<string>();
	for (let i = 0; i + n <= sequence.length; i++)
		found.add(sequence.slice(i, i + n));
	return (
		found.size === k ** n && [...sequence].every((digit) => Number(digit) < k)
	);
};

describe("753. Cracking the Safe", () => {
	it("solves the examples from the problem statement", () => {
		expect(crackingTheSafe(1, 2)).toHaveLength(2);
		expect(opensEverything(crackingTheSafe(1, 2), 1, 2)).toBeTrue();
		expect(crackingTheSafe(2, 2)).toHaveLength(5);
		expect(opensEverything(crackingTheSafe(2, 2), 2, 2)).toBeTrue();
	});

	it("gives a shortest sequence containing every password within the constraints", () => {
		for (let n = 1; n <= 4; n++) {
			for (let k = 1; k <= 10 && k ** n <= 4096; k++) {
				const sequence = crackingTheSafe(n, k);
				expect(sequence).toHaveLength(k ** n + n - 1);
				expect(opensEverything(sequence, n, k)).toBeTrue();
			}
		}
	});
});
