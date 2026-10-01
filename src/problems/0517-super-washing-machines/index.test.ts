import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { superWashingMachines as findMinMoves } from ".";

/** Breadth-first search over every way each machine can pass a dress (or not) in a move. */
const byBreadthFirstSearch = (machines: number[]): number => {
	const total = machines.reduce((sum, dresses) => sum + dresses, 0);
	if (total % machines.length !== 0) return -1;
	const target = machines.map(() => total / machines.length).join();
	const seen = new Set([machines.join()]);
	let frontier = [machines];
	for (let moves = 0; frontier.length > 0; moves++) {
		const next: number[][] = [];
		for (const state of frontier) {
			if (state.join() === target) return moves;
			for (let choice = 0; choice < 3 ** state.length; choice++) {
				const after = [...state];
				let rest = choice;
				let valid = true;
				for (let i = 0; i < state.length; i++, rest = Math.floor(rest / 3)) {
					const action = rest % 3;
					if (action === 0) continue;
					const to = action === 1 ? i - 1 : i + 1;
					if ((state[i] ?? 0) === 0 || to < 0 || to >= state.length)
						valid = false;
					else {
						after[i] = (after[i] ?? 0) - 1;
						after[to] = (after[to] ?? 0) + 1;
					}
				}
				if (valid && !seen.has(after.join())) {
					seen.add(after.join());
					next.push(after);
				}
			}
		}
		frontier = next;
	}
	return -1;
};

describe("517. Super Washing Machines", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMinMoves([1, 0, 5])).toBe(3);
		expect(findMinMoves([0, 3, 0])).toBe(2);
		expect(findMinMoves([0, 2, 0])).toBe(-1);
	});

	it("matches searching every sequence of moves for small inputs", () => {
		const random = createRandom(517);
		for (let run = 0; run < 150; run++) {
			const machines = random.array(random.int(1, 4), 0, 4);
			expect(findMinMoves(machines)).toBe(byBreadthFirstSearch(machines));
		}
	});
});
