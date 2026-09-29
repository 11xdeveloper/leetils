import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { freedomTrail as findRotateSteps } from ".";

/** Breadth-first search over (dial position, characters spelled), one step at a time. */
const byBreadthFirstSearch = (ring: string, key: string): number => {
	const n = ring.length;
	const seen = new Set(["0,0"]);
	let frontier = [[0, 0]];
	for (let steps = 0; frontier.length > 0; steps++) {
		const next: number[][] = [];
		for (const [position = 0, spelled = 0] of frontier) {
			if (spelled === key.length) return steps;
			const moves = [
				[(position + 1) % n, spelled],
				[(position + n - 1) % n, spelled],
			];
			if (ring.charAt(position) === key.charAt(spelled))
				moves.push([position, spelled + 1]);
			for (const move of moves) {
				if (!seen.has(move.join())) {
					seen.add(move.join());
					next.push(move);
				}
			}
		}
		frontier = next;
	}
	return -1;
};

describe("514. Freedom Trail", () => {
	it("solves the examples from the problem statement", () => {
		expect(findRotateSteps("godding", "gd")).toBe(4);
		expect(findRotateSteps("godding", "godding")).toBe(13);
	});

	it("matches a step-by-step search on random inputs", () => {
		const random = createRandom(514);
		for (let run = 0; run < 500; run++) {
			const ring = random.string(random.int(1, 10), "abc");
			const key = random.string(random.int(1, 6), ring);
			expect(findRotateSteps(ring, key)).toBe(byBreadthFirstSearch(ring, key));
		}
	});
});
