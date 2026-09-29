import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { courseSchedule } from ".";

/** Looks for a cycle with a depth-first search that tracks the current path. */
const hasCycle = (n: number, prerequisites: number[][]): boolean => {
	const edges: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of prerequisites) edges[b]?.push(a);
	const state = new Array<number>(n).fill(0); // 0 new, 1 on path, 2 done
	const visit = (v: number): boolean => {
		if (state[v] === 1) return true;
		if (state[v] === 2) return false;
		state[v] = 1;
		const found = (edges[v] ?? []).some(visit);
		state[v] = 2;
		return found;
	};
	return Array.from({ length: n }, (_, v) => v).some(visit);
};

describe("207. Course Schedule", () => {
	it("solves the examples from the problem statement", () => {
		expect(courseSchedule(2, [[1, 0]])).toBeTrue();
		expect(
			courseSchedule(2, [
				[1, 0],
				[0, 1],
			]),
		).toBeFalse();
	});

	it("handles courses with no prerequisites and self-prerequisites", () => {
		expect(courseSchedule(3, [])).toBeTrue();
		expect(courseSchedule(1, [[0, 0]])).toBeFalse();
	});

	it("matches cycle detection on random prerequisites", () => {
		const random = createRandom(207);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 7);
			const prerequisites = Array.from({ length: random.int(0, 8) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			expect(courseSchedule(n, prerequisites)).toBe(
				!hasCycle(n, prerequisites),
			);
		}
	});
});
