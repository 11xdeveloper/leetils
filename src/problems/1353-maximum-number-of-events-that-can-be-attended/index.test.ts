import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfEventsThatCanBeAttended as maxEvents } from ".";

/** Largest matching of events to days, by augmenting paths. */
const byBruteForce = (events: number[][]): number => {
	const dayOf = new Map<number, number>();
	const tryAssign = (event: number, visited: Set<number>): boolean => {
		const [start = 0, end = 0] = events[event] ?? [];
		for (let day = start; day <= end; day++) {
			if (visited.has(day)) continue;
			visited.add(day);
			const owner = dayOf.get(day);
			if (owner === undefined || tryAssign(owner, visited)) {
				dayOf.set(day, event);
				return true;
			}
		}
		return false;
	};
	return events.filter((_, i) => tryAssign(i, new Set())).length;
};

describe("1353. Maximum Number of Events That Can Be Attended", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxEvents([
				[1, 2],
				[2, 3],
				[3, 4],
			]),
		).toBe(3);
		expect(
			maxEvents([
				[1, 2],
				[2, 3],
				[3, 4],
				[1, 2],
			]),
		).toBe(4);
	});

	it("matches a matching of events to days on random inputs", () => {
		const random = createRandom(1353);
		for (let run = 0; run < 300; run++) {
			const events = Array.from({ length: random.int(1, 10) }, () => {
				const start = random.int(1, 8);
				return [start, start + random.int(0, 3)];
			});
			expect(maxEvents(events)).toBe(byBruteForce(events));
		}
	});
});
