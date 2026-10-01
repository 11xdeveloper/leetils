import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { timeNeededToInformAllEmployees as numOfMinutes } from ".";

/** Adds up the inform times up each employee's chain of managers. */
const byBruteForce = (manager: number[], informTime: number[]): number =>
	Math.max(
		...manager.map((_, employee) => {
			let total = 0;
			for (
				let boss = manager[employee] ?? -1;
				boss !== -1;
				boss = manager[boss] ?? -1
			) {
				total += informTime[boss] ?? 0;
			}
			return total;
		}),
	);

describe("1376. Time Needed to Inform All Employees", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfMinutes(1, 0, [-1], [0])).toBe(0);
		expect(numOfMinutes(6, 2, [2, 2, -1, 2, 2, 2], [0, 0, 1, 0, 0, 0])).toBe(1);
	});

	it("handles a long chain", () => {
		const n = 100000;
		const manager = Array.from({ length: n }, (_, i) => i - 1);
		const informTime = Array.from({ length: n }, (_, i) =>
			i === n - 1 ? 0 : 1,
		);
		expect(numOfMinutes(n, 0, manager, informTime)).toBe(n - 1);
	});

	it("matches walking up to the head on random companies", () => {
		const random = createRandom(1376);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const manager = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const informTime = manager.map((_, i) =>
				manager.includes(i) ? random.int(1, 10) : 0,
			);
			expect(numOfMinutes(n, 0, manager, informTime)).toBe(
				byBruteForce(manager, informTime),
			);
		}
	});
});
