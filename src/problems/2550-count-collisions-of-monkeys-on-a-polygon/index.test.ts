import { describe, expect, it } from "bun:test";
import { countCollisionsOfMonkeysOnAPolygon as monkeyMove } from ".";

describe("2550. Count Collisions of Monkeys on a Polygon", () => {
	it("solves the examples from the problem statement", () => {
		expect(monkeyMove(3)).toBe(6);
		expect(monkeyMove(4)).toBe(14);
	});

	it("reduces modulo 1e9 + 7", () => {
		// 2^(p - 1) ≡ 1 (mod p) by Fermat's little theorem
		expect(monkeyMove(1_000_000_006)).toBe(1_000_000_006);
	});
});
