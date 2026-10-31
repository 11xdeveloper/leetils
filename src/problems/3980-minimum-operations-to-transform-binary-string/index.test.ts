import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToTransformBinaryString as minOperations } from ".";

/** Breadth-first search over strings. */
const byBruteForce = (s1: string, s2: string): number => {
	const distance = new Map([[s1, 0]]);
	const queue = [s1];
	for (let q = 0; q < queue.length; q++) {
		const s = queue[q] ?? "";
		if (s === s2) return distance.get(s) ?? 0;
		const next: string[] = [];
		for (let i = 0; i < s.length; i++) {
			if (s[i] === "0") next.push(`${s.slice(0, i)}1${s.slice(i + 1)}`);
			if (s[i] === "1" && s[i + 1] === "1")
				next.push(`${s.slice(0, i)}00${s.slice(i + 2)}`);
		}
		for (const t of next)
			if (!distance.has(t)) {
				distance.set(t, (distance.get(s) ?? 0) + 1);
				queue.push(t);
			}
	}
	return -1;
};

describe("3980. Minimum Operations to Transform Binary String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("11", "00")).toBe(1);
		expect(minOperations("01", "10")).toBe(3);
		expect(minOperations("1", "0")).toBe(-1);
	});

	it("matches searching every string", () => {
		const random = createRandom(3980);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 8);
			const [s1, s2] = [random.string(n, "01"), random.string(n, "01")];
			expect(minOperations(s1, s2)).toBe(byBruteForce(s1, s2));
		}
	});
});
