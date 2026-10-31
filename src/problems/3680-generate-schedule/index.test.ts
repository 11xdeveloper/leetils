import { describe, expect, it } from "bun:test";
import { generateSchedule } from ".";

/** Checks a schedule plays every ordered pair once with no back-to-back teams. */
const valid = (n: number, schedule: number[][]): boolean => {
	if (schedule.length !== n * (n - 1)) return false;
	const seen = new Set<string>();
	return schedule.every(([home = 0, away = 0], day) => {
		if (home === away || seen.has(`${home},${away}`)) return false;
		seen.add(`${home},${away}`);
		const [ph, pa] = schedule[day - 1] ?? [-1, -1];
		return day === 0 || ![ph, pa].some((t) => t === home || t === away);
	});
};

describe("3680. Generate Schedule", () => {
	it("solves the examples from the problem statement", () => {
		expect(generateSchedule(3)).toEqual([]);
		expect(valid(5, generateSchedule(5))).toBeTrue();
	});

	it("schedules every size that's possible", () => {
		for (let n = 2; n <= 4; n++) expect(generateSchedule(n)).toEqual([]);
		for (let n = 5; n <= 50; n++)
			expect(valid(n, generateSchedule(n))).toBeTrue();
	});
});
