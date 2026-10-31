import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToSortAString as minOperations } from ".";

/** Breadth-first search over every sort. */
const byBruteForce = (s: string): number => {
	const goal = [...s].sort().join("");
	const distance = new Map([[s, 0]]);
	const queue = [s];
	for (let q = 0; q < queue.length; q++) {
		const t = queue[q] ?? "";
		if (t === goal) return distance.get(t) ?? 0;
		for (let i = 0; i < t.length; i++)
			for (let j = i + 1; j <= t.length; j++) {
				if (j - i === t.length) continue;
				const next =
					t.slice(0, i) + [...t.slice(i, j)].sort().join("") + t.slice(j);
				if (!distance.has(next)) {
					distance.set(next, (distance.get(t) ?? 0) + 1);
					queue.push(next);
				}
			}
	}
	return -1;
};

describe("3863. Minimum Operations to Sort a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("dog")).toBe(1);
		expect(minOperations("card")).toBe(2);
		expect(minOperations("gf")).toBe(-1);
	});

	it("matches searching every sort on random strings", () => {
		const random = createRandom(3863);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 7), "abcd");
			expect(minOperations(s)).toBe(byBruteForce(s));
		}
	});
});
