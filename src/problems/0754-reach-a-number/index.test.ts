import { describe, expect, it } from "bun:test";
import { reachANumber } from ".";

describe("754. Reach a Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(reachANumber(2)).toBe(3);
		expect(reachANumber(3)).toBe(2);
	});

	it("matches a breadth-first search over reachable positions", () => {
		const best = new Map<number, number>([[0, 0]]);
		let positions = new Set([0]);
		for (let move = 1; move <= 20; move++) {
			const next = new Set<number>();
			for (const position of positions) {
				for (const to of [position + move, position - move]) {
					next.add(to);
					if (!best.has(to)) best.set(to, move);
				}
			}
			positions = next;
		}
		for (let target = -40; target <= 40; target++)
			if (target !== 0)
				expect(reachANumber(target)).toBe(best.get(target) ?? -1);
	});

	it("handles the largest input", () => {
		expect(reachANumber(10 ** 9)).toBe(44723);
	});
});
