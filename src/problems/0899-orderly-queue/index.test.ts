import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { orderlyQueue } from ".";

/** Breadth-first search over every reachable string. */
const bySearch = (s: string, k: number): string => {
	const seen = new Set([s]);
	const queue = [s];
	for (const current of queue) {
		for (let i = 0; i < Math.min(k, current.length); i++) {
			const moved =
				current.slice(0, i) + current.slice(i + 1) + current.charAt(i);
			if (!seen.has(moved)) {
				seen.add(moved);
				queue.push(moved);
			}
		}
	}
	return [...seen].sort()[0] ?? s;
};

describe("899. Orderly Queue", () => {
	it("solves the examples from the problem statement", () => {
		expect(orderlyQueue("cba", 1)).toBe("acb");
		expect(orderlyQueue("baaca", 3)).toBe("aaabc");
	});

	it("matches searching every reachable string on random inputs", () => {
		const random = createRandom(899);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 6), "abc");
			const k = random.int(1, s.length);
			expect(orderlyQueue(s, k)).toBe(bySearch(s, k));
		}
	});
});
