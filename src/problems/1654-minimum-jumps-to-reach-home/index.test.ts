import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumJumpsToReachHome as minimumJumps } from ".";

/** The same search with a much looser bound on positions. */
const byBruteForce = (
	forbidden: number[],
	a: number,
	b: number,
	x: number,
): number => {
	const limit = 2000;
	const dist = new Map<string, number>([["0,0", 0]]);
	const queue: [number, number][] = [[0, 0]];
	for (let i = 0; i < queue.length; i++) {
		const [position, back] = queue[i] ?? [0, 0];
		const d = dist.get(`${position},${back}`) ?? 0;
		if (position === x) return d;
		const moves: [number, number][] = [[position + a, 0]];
		if (back === 0) moves.push([position - b, 1]);
		for (const [target, isBack] of moves) {
			const key = `${target},${isBack}`;
			if (
				target < 0 ||
				target > limit ||
				forbidden.includes(target) ||
				dist.has(key)
			)
				continue;
			dist.set(key, d + 1);
			queue.push([target, isBack]);
		}
	}
	return -1;
};

describe("1654. Minimum Jumps to Reach Home", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumJumps([14, 4, 18, 1, 15], 3, 15, 9)).toBe(3);
		expect(minimumJumps([8, 3, 16, 6, 12, 20], 15, 13, 11)).toBe(-1);
		expect(minimumJumps([1, 6, 2, 14, 5, 17, 4], 16, 9, 7)).toBe(2);
	});

	it("matches a search with a looser bound on random inputs", () => {
		const random = createRandom(1654);
		for (let run = 0; run < 300; run++) {
			const x = random.int(0, 30);
			const forbidden = [
				...new Set(random.array(random.int(1, 5), 1, 40)),
			].filter((f) => f !== x);
			const [a, b] = [random.int(1, 20), random.int(1, 20)];
			expect(minimumJumps(forbidden, a, b, x)).toBe(
				byBruteForce(forbidden, a, b, x),
			);
		}
	});
});
