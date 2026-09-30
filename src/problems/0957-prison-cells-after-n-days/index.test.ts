import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { prisonCellsAfterNDays } from ".";

describe("957. Prison Cells After N Days", () => {
	it("solves the examples from the problem statement", () => {
		expect(prisonCellsAfterNDays([0, 1, 0, 1, 1, 0, 0, 1], 7)).toEqual([
			0, 0, 1, 1, 0, 0, 0, 0,
		]);
		expect(
			prisonCellsAfterNDays([1, 0, 0, 1, 0, 0, 1, 0], 1_000_000_000),
		).toEqual([0, 0, 1, 1, 1, 1, 1, 0]);
	});

	it("matches simulating every day for random cells and up to 300 days", () => {
		const random = createRandom(957);
		for (let run = 0; run < 100; run++) {
			const cells = random.array(8, 0, 1);
			let state = [...cells];
			for (let day = 1; day <= 300; day++) {
				state = state.map((_, i) =>
					i > 0 && i < 7 && state[i - 1] === state[i + 1] ? 1 : 0,
				);
				if (day % 23 === 0)
					expect(prisonCellsAfterNDays(cells, day)).toEqual(state);
			}
		}
	});
});
