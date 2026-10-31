import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { applyOperationsToMakeTwoStringsEqual as minOperations } from ".";

/** Dijkstra over bit strings. */
const byBruteForce = (s1: string, s2: string, x: number): number => {
	const n = s1.length;
	const start = Number.parseInt(s1, 2);
	const goal = Number.parseInt(s2, 2);
	const best = Array.from({ length: 1 << n }, () => Number.POSITIVE_INFINITY);
	best[start] = 0;
	const done = new Uint8Array(1 << n);
	for (;;) {
		let node = -1;
		for (let v = 0; v < 1 << n; v++)
			if (!done[v] && (node === -1 || (best[v] ?? 0) < (best[node] ?? 0)))
				node = v;
		if (node === -1 || best[node] === Number.POSITIVE_INFINITY) break;
		done[node] = 1;
		for (let i = 0; i < n; i++)
			for (let j = i + 1; j < n; j++) {
				const next = node ^ (1 << i) ^ (1 << j);
				const cost = (best[node] ?? 0) + (j === i + 1 ? Math.min(1, x) : x);
				if (cost < (best[next] ?? 0)) best[next] = cost;
			}
	}
	const answer = best[goal] ?? Number.POSITIVE_INFINITY;
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};

describe("2896. Apply Operations to Make Two Strings Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("1100011000", "0101001010", 2)).toBe(4);
		expect(minOperations("10110", "00011", 4)).toBe(-1);
	});

	it("matches a shortest-path search on random strings", () => {
		const random = createRandom(2896);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 7);
			const s1 = random.string(n, "01");
			const s2 = random.string(n, "01");
			const x = random.int(1, 6);
			expect(minOperations(s1, s2, x)).toBe(byBruteForce(s1, s2, x));
		}
	});
});
