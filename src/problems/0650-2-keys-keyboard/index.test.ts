import { describe, expect, it } from "bun:test";
import { twoKeysKeyboard as minSteps } from ".";

/** Breadth-first search over (on screen, clipboard) states. */
const bySearch = (n: number): number => {
	const seen = new Set(["1,0"]);
	let frontier = [[1, 0]];
	for (let steps = 0; ; steps++) {
		const next: number[][] = [];
		for (const [screen = 0, clipboard = 0] of frontier) {
			if (screen === n) return steps;
			for (const state of [
				[screen, screen],
				[screen + clipboard, clipboard],
			]) {
				if ((state[0] ?? 0) <= n && !seen.has(state.join())) {
					seen.add(state.join());
					next.push(state);
				}
			}
		}
		frontier = next;
	}
};

describe("650. 2 Keys Keyboard", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSteps(3)).toBe(3);
		expect(minSteps(1)).toBe(0);
	});

	it("matches searching every sequence of keys up to n = 200", () => {
		for (let n = 1; n <= 200; n++) expect(minSteps(n)).toBe(bySearch(n));
	});
});
