import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rangeAdditionII as maxCount } from ".";

const bySimulation = (m: number, n: number, ops: number[][]): number => {
	const matrix = Array.from({ length: m }, () => new Array<number>(n).fill(0));
	for (const [a = 0, b = 0] of ops) {
		for (const row of matrix.slice(0, a))
			for (let c = 0; c < b; c++) row[c] = (row[c] ?? 0) + 1;
	}
	const cells = matrix.flat();
	const max = Math.max(...cells);
	return cells.filter((cell) => cell === max).length;
};

describe("598. Range Addition II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxCount(3, 3, [
				[2, 2],
				[3, 3],
			]),
		).toBe(4);
		expect(
			maxCount(3, 3, [
				[2, 2],
				[3, 3],
				[3, 3],
				[3, 3],
				[2, 2],
				[3, 3],
				[3, 3],
				[3, 3],
				[2, 2],
				[3, 3],
				[3, 3],
				[3, 3],
			]),
		).toBe(4);
		expect(maxCount(3, 3, [])).toBe(9);
	});

	it("matches applying every operation on random inputs", () => {
		const random = createRandom(598);
		for (let run = 0; run < 500; run++) {
			const m = random.int(1, 6);
			const n = random.int(1, 6);
			const ops = Array.from({ length: random.int(0, 5) }, () => [
				random.int(1, m),
				random.int(1, n),
			]);
			expect(maxCount(m, n, ops)).toBe(bySimulation(m, n, ops));
		}
	});
});
