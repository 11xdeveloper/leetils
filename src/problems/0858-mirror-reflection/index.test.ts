import { describe, expect, it } from "bun:test";
import { mirrorReflection } from ".";

/**
 * The ray crosses k room widths while climbing m room heights, with k · q = m · p
 * at the first corner. Odd m ends on the north wall, and the parity of k picks east or west.
 */
const byUnfolding = (p: number, q: number): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const g = gcd(p, q);
	const widths = p / g;
	const heights = q / g;
	if (heights % 2 === 0) return 0;
	return widths % 2 === 1 ? 1 : 2;
};

describe("858. Mirror Reflection", () => {
	it("solves the examples from the problem statement", () => {
		expect(mirrorReflection(2, 1)).toBe(2);
		expect(mirrorReflection(3, 1)).toBe(1);
	});

	it("matches unfolding the room for every p and q up to 100", () => {
		for (let p = 1; p <= 100; p++)
			for (let q = 0; q <= p; q++)
				if (q > 0) expect(mirrorReflection(p, q)).toBe(byUnfolding(p, q));
	});
});
