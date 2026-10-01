import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pushDominoes } from ".";

/** Simulates the pushes second by second. */
const bySimulation = (dominoes: string): string => {
	let state = dominoes;
	for (;;) {
		const next = [...state].map((domino, i) => {
			if (domino !== ".") return domino;
			const fromLeft = state.charAt(i - 1) === "R";
			const fromRight = state.charAt(i + 1) === "L";
			if (fromLeft && !fromRight) return "R";
			if (fromRight && !fromLeft) return "L";
			return ".";
		});
		const joined = next.join("");
		if (joined === state) return state;
		state = joined;
	}
};

describe("838. Push Dominoes", () => {
	it("solves the examples from the problem statement", () => {
		expect(pushDominoes("RR.L")).toBe("RR.L");
		expect(pushDominoes(".L.R...LR..L..")).toBe("LL.RR.LLRRLL..");
	});

	it("matches simulating each second on random rows", () => {
		const random = createRandom(838);
		for (let run = 0; run < 1000; run++) {
			const dominoes = random.string(random.int(1, 15), "..LR");
			expect(pushDominoes(dominoes)).toBe(bySimulation(dominoes));
		}
	});
});
