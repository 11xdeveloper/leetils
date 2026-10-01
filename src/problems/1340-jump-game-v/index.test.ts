import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { jumpGameV as maxJumps } from ".";

/** Plain recursion over every jump from every start. */
const byBruteForce = (arr: number[], d: number): number => {
	const visit = (i: number): number => {
		let most = 1;
		for (const step of [-1, 1]) {
			for (
				let j = i + step;
				j >= 0 && j < arr.length && Math.abs(j - i) <= d;
				j += step
			) {
				if ((arr[j] ?? 0) >= (arr[i] ?? 0)) break;
				most = Math.max(most, 1 + visit(j));
			}
		}
		return most;
	};
	return Math.max(...arr.map((_, i) => visit(i)));
};

describe("1340. Jump Game V", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxJumps([6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12], 2)).toBe(4);
		expect(maxJumps([3, 3, 3, 3, 3], 3)).toBe(1);
		expect(maxJumps([7, 6, 5, 4, 3, 2, 1], 1)).toBe(7);
	});

	it("matches plain recursion on random inputs", () => {
		const random = createRandom(1340);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 9), 1, 6);
			const d = random.int(1, arr.length);
			expect(maxJumps(arr, d)).toBe(byBruteForce(arr, d));
		}
	});
});
