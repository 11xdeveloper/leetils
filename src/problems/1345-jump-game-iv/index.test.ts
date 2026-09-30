import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { jumpGameIV as minJumps } from ".";

/** Relaxes distances over every possible jump until stable. */
const byBruteForce = (arr: number[]): number => {
	const distance = arr.map((_, i) => (i === 0 ? 0 : Infinity));
	for (let changed = true; changed; ) {
		changed = false;
		arr.forEach((value, i) => {
			arr.forEach((other, j) => {
				if (Math.abs(i - j) !== 1 && (other !== value || i === j)) return;
				if ((distance[i] ?? Infinity) + 1 < (distance[j] ?? Infinity)) {
					distance[j] = (distance[i] ?? 0) + 1;
					changed = true;
				}
			});
		});
	}
	return distance.at(-1) ?? 0;
};

describe("1345. Jump Game IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(minJumps([100, -23, -23, 404, 100, 23, 23, 23, 3, 404])).toBe(3);
		expect(minJumps([7])).toBe(0);
		expect(minJumps([7, 6, 9, 6, 9, 6, 9, 7])).toBe(1);
	});

	it("handles a long run of equal values quickly", () => {
		const arr = [...new Array<number>(49999).fill(7), 8];
		expect(minJumps(arr)).toBe(2);
	});

	it("matches relaxing distances on random inputs", () => {
		const random = createRandom(1345);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 12), 1, 5);
			expect(minJumps(arr)).toBe(byBruteForce(arr));
		}
	});
});
