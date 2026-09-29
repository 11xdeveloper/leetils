import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { flipGame } from "../0293-flip-game";
import { flipGameII } from ".";

/** Searches every sequence of moves, using Flip Game for the moves. */
const bySearch = (
	state: string,
	memo = new Map<string, boolean>(),
): boolean => {
	const cached = memo.get(state);
	if (cached !== undefined) return cached;
	const wins = flipGame(state).some((next) => !bySearch(next, memo));
	memo.set(state, wins);
	return wins;
};

describe("294. Flip Game II", () => {
	it("solves the examples from the problem statement", () => {
		expect(flipGameII("++++")).toBeTrue();
		expect(flipGameII("+")).toBeFalse();
	});

	it("handles several runs of +", () => {
		expect(flipGameII("++-++")).toBeFalse();
		expect(flipGameII("+++-++")).toBeFalse();
	});

	it("handles the constraint of 60 characters with runs of 20", () => {
		const state = `${"+".repeat(20)}-${"+".repeat(20)}-${"+".repeat(18)}`;
		expect(typeof flipGameII(state)).toBe("boolean");
	});

	it("matches searching every sequence of moves on random states", () => {
		const random = createRandom(294);
		for (let run = 0; run < 500; run++) {
			const state = random.string(random.int(1, 14), "+++-");
			expect(flipGameII(state)).toBe(bySearch(state));
		}
	});
});
