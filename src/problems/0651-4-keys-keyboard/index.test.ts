import { describe, expect, it } from "bun:test";
import { fourKeysKeyboard as maxA } from ".";

/** Breadth-first search over (screen, clipboard, selected) states, one key at a time. */
const bySearch = (n: number): number => {
	let states = new Set(["0,0,0"]);
	let most = 0;
	for (let press = 0; press < n; press++) {
		const next = new Set<string>();
		for (const state of states) {
			const [screen = 0, clipboard = 0, selected = 0] = state
				.split(",")
				.map(Number);
			next.add(`${screen + 1},${clipboard},0`);
			next.add(`${screen},${clipboard},1`);
			if (selected) next.add(`${screen},${screen},1`);
			next.add(`${screen + clipboard},${clipboard},0`);
		}
		states = next;
		for (const state of states)
			most = Math.max(most, Number(state.split(",")[0]));
	}
	return most;
};

describe("651. 4 Keys Keyboard", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxA(3)).toBe(3);
		expect(maxA(7)).toBe(9);
	});

	it("matches searching every sequence of keys up to n = 14", () => {
		for (let n = 1; n <= 14; n++) expect(maxA(n)).toBe(bySearch(n));
	});

	it("handles the largest input", () => {
		expect(maxA(50)).toBe(1327104);
	});
});
