import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { courseSchedule } from "../0207-course-schedule";
import { courseScheduleII } from ".";

const isValidOrder = (
	n: number,
	prerequisites: number[][],
	order: number[],
): boolean => {
	if (order.length !== n || new Set(order).size !== n) return false;
	const position = new Map(order.map((course, i) => [course, i]));
	return prerequisites.every(
		([a = 0, b = 0]) => (position.get(b) ?? n) < (position.get(a) ?? -1),
	);
};

describe("210. Course Schedule II", () => {
	it("solves the examples from the problem statement", () => {
		expect(courseScheduleII(2, [[1, 0]])).toEqual([0, 1]);
		const prerequisites = [
			[1, 0],
			[2, 0],
			[3, 1],
			[3, 2],
		];
		expect(
			isValidOrder(4, prerequisites, courseScheduleII(4, prerequisites)),
		).toBeTrue();
		expect(courseScheduleII(1, [])).toEqual([0]);
	});

	it("returns an empty order when there is a cycle", () => {
		expect(
			courseScheduleII(2, [
				[0, 1],
				[1, 0],
			]),
		).toEqual([]);
	});

	it("returns valid orders exactly when Course Schedule says one exists", () => {
		const random = createRandom(210);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 7);
			const prerequisites = Array.from({ length: random.int(0, 8) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			const order = courseScheduleII(n, prerequisites);
			if (courseSchedule(n, prerequisites)) {
				expect(isValidOrder(n, prerequisites, order)).toBeTrue();
			} else {
				expect(order).toEqual([]);
			}
		}
	});
});
