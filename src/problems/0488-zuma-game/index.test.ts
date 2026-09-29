import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { zumaGame as findMinStep } from ".";

/** Breadth-first search trying every ball at every position. */
const byBruteForce = (board: string, hand: string): number => {
	const settle = (row: string): string => {
		const next = row.replace(/(.)\1{2,}/, "");
		return next === row ? row : settle(next);
	};
	let frontier = [[board, hand]];
	for (let used = 1; frontier.length > 0; used++) {
		const next: string[][] = [];
		for (const [row = "", balls = ""] of frontier) {
			for (let i = 0; i <= row.length; i++) {
				for (let j = 0; j < balls.length; j++) {
					const after = settle(
						row.slice(0, i) + balls.charAt(j) + row.slice(i),
					);
					if (after === "") return used;
					next.push([after, balls.slice(0, j) + balls.slice(j + 1)]);
				}
			}
		}
		frontier = next;
	}
	return -1;
};

describe("488. Zuma Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMinStep("WRRBBW", "RB")).toBe(-1);
		expect(findMinStep("WWRRBBWW", "WRBRW")).toBe(2);
		expect(findMinStep("G", "GGGGG")).toBe(2);
	});

	it("inserts between two equal balls when that's the only way", () => {
		expect(findMinStep("RRWWRRBBRR", "WB")).toBe(2);
	});

	it("handles the largest inputs", () => {
		expect(findMinStep("RRGGBBYYWWRRGGBB", "RGBYW")).toBe(-1);
	});

	it("matches trying every insertion on random inputs", () => {
		const random = createRandom(488);
		for (let run = 0; run < 300; run++) {
			let board = "";
			while (board.length < random.int(1, 7)) {
				const ball = random.string(1, "RGB");
				if (!board.endsWith(ball + ball)) board += ball;
			}
			const hand = random.string(random.int(1, 3), "RGB");
			expect(findMinStep(board, hand)).toBe(byBruteForce(board, hand));
		}
	});
});
