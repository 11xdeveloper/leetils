import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { handlingSumQueriesAfterUpdate as handleQuery } from ".";

/** Applies every query directly. */
const byBruteForce = (
	nums1: number[],
	nums2: number[],
	queries: number[][],
): number[] => {
	const bits = [...nums1];
	const values = [...nums2];
	const answers: number[] = [];
	for (const [kind, a = 0, b = 0] of queries) {
		if (kind === 1) for (let i = a; i <= b; i++) bits[i] = 1 - (bits[i] ?? 0);
		else if (kind === 2)
			for (let i = 0; i < values.length; i++)
				values[i] = (values[i] ?? 0) + (bits[i] ?? 0) * a;
		else answers.push(values.reduce((s, x) => s + x, 0));
	}
	return answers;
};

describe("2569. Handling Sum Queries After Update", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			handleQuery(
				[1, 0, 1],
				[0, 0, 0],
				[
					[1, 1, 1],
					[2, 1, 0],
					[3, 0, 0],
				],
			),
		).toEqual([3]);
		expect(
			handleQuery(
				[1],
				[5],
				[
					[2, 0, 0],
					[3, 0, 0],
				],
			),
		).toEqual([5]);
	});

	it("matches applying queries directly on random inputs", () => {
		const random = createRandom(2569);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 10);
			const nums1 = random.array(n, 0, 1);
			const nums2 = random.array(n, 0, 10);
			const queries = Array.from({ length: random.int(1, 15) }, () => {
				const kind = random.int(1, 3);
				if (kind === 1) {
					const l = random.int(0, n - 1);
					return [1, l, random.int(l, n - 1)];
				}
				return kind === 2 ? [2, random.int(0, 5), 0] : [3, 0, 0];
			});
			expect(handleQuery(nums1, nums2, queries)).toEqual(
				byBruteForce(nums1, nums2, queries),
			);
		}
	});
});
