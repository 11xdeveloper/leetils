import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { parallelCourses as minimumSemesters } from ".";

/** Each semester, rescans for every course whose prerequisites are all done. */
const byBruteForce = (n: number, relations: number[][]): number => {
	const done = new Set<number>();
	let semesters = 0;
	while (done.size < n) {
		const ready: number[] = [];
		for (let course = 1; course <= n; course++) {
			if (done.has(course)) continue;
			if (
				relations.every(
					([before = 0, after]) => after !== course || done.has(before),
				)
			)
				ready.push(course);
		}
		if (ready.length === 0) return -1;
		for (const course of ready) done.add(course);
		semesters++;
	}
	return semesters;
};

describe("1136. Parallel Courses", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumSemesters(3, [
				[1, 3],
				[2, 3],
			]),
		).toBe(2);
		expect(
			minimumSemesters(3, [
				[1, 2],
				[2, 3],
				[3, 1],
			]),
		).toBe(-1);
	});

	it("handles a long chain", () => {
		const chain = Array.from({ length: 4999 }, (_, i) => [i + 1, i + 2]);
		expect(minimumSemesters(5000, chain)).toBe(5000);
	});

	it("matches taking every ready course each semester on random inputs", () => {
		const random = createRandom(1136);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 8);
			const pairs = new Set<string>();
			for (let i = random.int(0, 12); i > 0; i--) {
				const [a, b] = [random.int(1, n), random.int(1, n)];
				if (a !== b) pairs.add(`${a},${b}`);
			}
			const relations = [...pairs].map((pair) => pair.split(",").map(Number));
			expect(minimumSemesters(n, relations)).toBe(byBruteForce(n, relations));
		}
	});
});
