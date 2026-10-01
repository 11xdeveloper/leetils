import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { robotReturnToOrigin as judgeCircle } from ".";

describe("657. Robot Return to Origin", () => {
	it("solves the examples from the problem statement", () => {
		expect(judgeCircle("UD")).toBeTrue();
		expect(judgeCircle("LL")).toBeFalse();
	});

	it("matches counting each move on random inputs", () => {
		const random = createRandom(657);
		const count = (moves: string, move: string) =>
			[...moves].filter((m) => m === move).length;
		for (let run = 0; run < 1000; run++) {
			const moves = random.string(random.int(1, 10), "UDLR");
			expect(judgeCircle(moves)).toBe(
				count(moves, "U") === count(moves, "D") &&
					count(moves, "L") === count(moves, "R"),
			);
		}
	});
});
