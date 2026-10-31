import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { earliestSecondToMarkIndicesI as earliestSecondToMarkIndices } from ".";

/** Whether a second can set its index to zero. */
const CAN_SET = false;

/** Breadth-first search over every reachable state, second by second. */
const byBruteForce = (
	nums: number[],
	changeIndices: number[],
	canSet = CAN_SET,
): number => {
	const n = nums.length;
	const full = (1 << n) - 1;
	let states = new Map<string, readonly [number[], number]>([
		[`${nums.join()}|0`, [nums, 0] as const],
	]);
	for (let s = 0; s < changeIndices.length; s++) {
		const next = new Map<string, readonly [number[], number]>();
		const add = (values: number[], marked: number) =>
			next.set(`${values.join()}|${marked}`, [values, marked]);
		const target = (changeIndices[s] ?? 1) - 1;
		for (const [values, marked] of states.values()) {
			add(values, marked);
			for (let i = 0; i < n; i++)
				if ((values[i] ?? 0) > 0)
					add(
						values.map((v, j) => (j === i ? v - 1 : v)),
						marked,
					);
			if (canSet) {
				add(
					values.map((v, j) => (j === target ? 0 : v)),
					marked,
				);
				for (let i = 0; i < n; i++)
					if (values[i] === 0) add(values, marked | (1 << i));
			} else if (values[target] === 0) add(values, marked | (1 << target));
		}
		for (const [, marked] of next.values()) if (marked === full) return s + 1;
		states = next;
	}
	return -1;
};

describe("3048. Earliest Second to Mark Indices I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			earliestSecondToMarkIndices([2, 2, 0], [2, 2, 2, 2, 3, 2, 2, 1]),
		).toBe(8);
		expect(earliestSecondToMarkIndices([1, 3], [1, 1, 1, 2, 1, 1, 1])).toBe(6);
		expect(earliestSecondToMarkIndices([0, 1], [2, 2, 2])).toBe(-1);
	});

	it("matches searching every action on random inputs", () => {
		const random = createRandom(3048);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 3);
			const nums = random.array(n, 0, 3);
			const changeIndices = random.array(random.int(1, 8), 1, n);
			expect(earliestSecondToMarkIndices(nums, changeIndices)).toBe(
				byBruteForce(nums, changeIndices),
			);
		}
	});
});
