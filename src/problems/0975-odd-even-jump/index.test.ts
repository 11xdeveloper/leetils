import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { oddEvenJump } from ".";

/** Follows the jumps from every start, finding each target by scanning. */
const bySimulation = (arr: number[]): number => {
	const n = arr.length;
	const jump = (i: number, oddJump: boolean): number => {
		let best = -1;
		for (let j = i + 1; j < n; j++) {
			const [value, current] = [arr[j] ?? 0, arr[i] ?? 0];
			if (
				oddJump
					? value >= current && (best === -1 || value < (arr[best] ?? 0))
					: value <= current && (best === -1 || value > (arr[best] ?? 0))
			)
				best = j;
		}
		return best;
	};
	let count = 0;
	for (let start = 0; start < n; start++) {
		let i = start;
		for (let jumpNumber = 1; i !== -1 && i !== n - 1; jumpNumber++)
			i = jump(i, jumpNumber % 2 === 1);
		if (i === n - 1) count++;
	}
	return count;
};

describe("975. Odd Even Jump", () => {
	it("solves the examples from the problem statement", () => {
		expect(oddEvenJump([10, 13, 12, 14, 15])).toBe(2);
		expect(oddEvenJump([2, 3, 1, 1, 4])).toBe(3);
		expect(oddEvenJump([5, 1, 3, 4, 2])).toBe(3);
	});

	it("matches following every start's jumps on random arrays", () => {
		const random = createRandom(975);
		for (let run = 0; run < 1000; run++) {
			const arr = random.array(random.int(1, 12), 0, 6);
			expect(oddEvenJump(arr)).toBe(bySimulation(arr));
		}
	});
});
