import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { frogJump } from ".";

/** Searches every sequence of jumps. */
const bySearch = (stones: number[]): boolean => {
	const positions = new Set(stones);
	const last = stones.at(-1) ?? 0;
	const seen = new Set<string>();
	const stack: [position: number, jump: number][] = [[0, 0]];
	for (let state = stack.pop(); state; state = stack.pop()) {
		const [position, jump] = state;
		if (position === last) return true;
		for (const next of [jump - 1, jump, jump + 1]) {
			const key = `${position + next},${next}`;
			if (next > 0 && positions.has(position + next) && !seen.has(key)) {
				seen.add(key);
				stack.push([position + next, next]);
			}
		}
	}
	return false;
};

describe("403. Frog Jump", () => {
	it("solves the examples from the problem statement", () => {
		expect(frogJump([0, 1, 3, 5, 6, 8, 12, 17])).toBeTrue();
		expect(frogJump([0, 1, 2, 3, 4, 8, 9, 11])).toBeFalse();
	});

	it("needs the first jump to be exactly 1", () => {
		expect(frogJump([0, 2])).toBeFalse();
	});

	it("matches searching every sequence of jumps on random rivers", () => {
		const random = createRandom(403);
		for (let run = 0; run < 1000; run++) {
			const stones = [0];
			for (let i = random.int(1, 10); i > 0; i--)
				stones.push((stones.at(-1) ?? 0) + random.int(1, 4));
			expect(frogJump(stones)).toBe(bySearch(stones));
		}
	});
});
