import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumCompatibilityScoreSum as maxCompatibilitySum } from ".";

describe("1947. Maximum Compatibility Score Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxCompatibilitySum(
				[
					[1, 1, 0],
					[1, 0, 1],
					[0, 0, 1],
				],
				[
					[1, 0, 0],
					[0, 0, 1],
					[1, 1, 0],
				],
			),
		).toBe(8);
		expect(
			maxCompatibilitySum(
				[
					[0, 0],
					[0, 0],
					[0, 0],
				],
				[
					[1, 1],
					[1, 1],
					[1, 1],
				],
			),
		).toBe(0);
	});

	it("matches trying every pairing on random inputs", () => {
		const random = createRandom(1947);
		for (let run = 0; run < 100; run++) {
			const [m, n] = [random.int(1, 5), random.int(1, 5)];
			const students = Array.from({ length: m }, () => random.array(n, 0, 1));
			const mentors = Array.from({ length: m }, () => random.array(n, 0, 1));
			let best = 0;
			const assign = (i: number, left: number[], total: number) => {
				if (i === m) best = Math.max(best, total);
				for (const [k, mentor] of left.entries()) {
					const shared = (students[i] ?? []).filter(
						(a, q) => a === mentors[mentor]?.[q],
					).length;
					assign(
						i + 1,
						left.filter((_, j) => j !== k),
						total + shared,
					);
				}
			};
			assign(
				0,
				Array.from({ length: m }, (_, i) => i),
				0,
			);
			expect(maxCompatibilitySum(students, mentors)).toBe(best);
		}
	});
});
