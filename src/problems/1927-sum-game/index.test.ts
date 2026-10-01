import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumGame } from ".";

/** Minimax over every move. */
const byBruteForce = (num: string): boolean => {
	const memo = new Map<string, boolean>();
	const aliceWins = (state: string, aliceToMove: boolean): boolean => {
		const key = `${state}|${aliceToMove}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		const index = state.indexOf("?");
		let result: boolean;
		if (index === -1) {
			const half = state.length / 2;
			const sum = (s: string) => [...s].reduce((t, d) => t + Number(d), 0);
			result = sum(state.slice(0, half)) !== sum(state.slice(half));
		} else {
			const outcomes: boolean[] = [];
			for (let i = 0; i < state.length; i++) {
				if (state[i] !== "?") continue;
				for (let d = 0; d <= 9; d++)
					outcomes.push(
						aliceWins(state.slice(0, i) + d + state.slice(i + 1), !aliceToMove),
					);
			}
			result = aliceToMove ? outcomes.some(Boolean) : outcomes.every(Boolean);
		}
		memo.set(key, result);
		return result;
	};
	return aliceWins(num, true);
};

describe("1927. Sum Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumGame("5023")).toBeFalse();
		expect(sumGame("25??")).toBeTrue();
		expect(sumGame("?3295???")).toBeFalse();
	});

	it("matches minimax on random inputs", () => {
		const random = createRandom(1927);
		for (let run = 0; run < 100; run++) {
			const num = random.string(2 * random.int(1, 2), "0189??");
			if ([...num].filter((c) => c === "?").length > 3) continue;
			expect(sumGame(num)).toBe(byBruteForce(num));
		}
	});
});
