import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToEqualizeBinaryString as minOperations } from ".";

/** Breadth-first search over every string. */
const byBruteForce = (s: string, k: number): number => {
	const n = s.length;
	const start = Number.parseInt(s, 2);
	const goal = (1 << n) - 1;
	const masks: number[] = [];
	for (let m = 0; m < 1 << n; m++) {
		let bits = 0;
		for (let x = m; x; x &= x - 1) bits++;
		if (bits === k) masks.push(m);
	}
	const distance = new Map([[start, 0]]);
	const queue = [start];
	for (let q = 0; q < queue.length; q++) {
		const x = queue[q] ?? 0;
		if (x === goal) return distance.get(x) ?? 0;
		for (const m of masks)
			if (!distance.has(x ^ m)) {
				distance.set(x ^ m, (distance.get(x) ?? 0) + 1);
				queue.push(x ^ m);
			}
	}
	return -1;
};

describe("3666. Minimum Operations to Equalize Binary String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("110", 1)).toBe(1);
		expect(minOperations("0101", 3)).toBe(2);
		expect(minOperations("101", 2)).toBe(-1);
	});

	it("matches searching every string", () => {
		const random = createRandom(3666);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 8), "01");
			const k = random.int(1, s.length);
			expect(minOperations(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
