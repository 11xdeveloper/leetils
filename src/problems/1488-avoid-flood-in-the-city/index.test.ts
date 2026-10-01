import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { avoidFloodInTheCity as avoidFlood } from ".";

/** Whether the plan follows the rules and never floods. */
const isValid = (rains: number[], plan: number[]): boolean => {
	if (plan.length !== rains.length) return false;
	const full = new Set<number>();
	return rains.every((lake, day) => {
		if (lake === 0) {
			if ((plan[day] ?? -1) < 1) return false;
			full.delete(plan[day] ?? 0);
			return true;
		}
		if (plan[day] !== -1 || full.has(lake)) return false;
		full.add(lake);
		return true;
	});
};

/** Whether any plan works, trying every lake on every dry day. */
const anyValid = (rains: number[]): boolean => {
	const lakes = [...new Set(rains.filter((lake) => lake !== 0)), 1];
	const plan = rains.map((lake): number => (lake === 0 ? 0 : -1));
	const choose = (day: number): boolean => {
		if (day === rains.length) return isValid(rains, plan);
		if (rains[day] !== 0) return choose(day + 1);
		return lakes.some((lake) => {
			plan[day] = lake;
			return choose(day + 1);
		});
	};
	return choose(0);
};

describe("1488. Avoid Flood in The City", () => {
	it("solves the examples from the problem statement", () => {
		expect(avoidFlood([1, 2, 3, 4])).toEqual([-1, -1, -1, -1]);
		expect(
			isValid([1, 2, 0, 0, 2, 1], avoidFlood([1, 2, 0, 0, 2, 1])),
		).toBeTrue();
		expect(avoidFlood([1, 2, 0, 1, 2])).toEqual([]);
	});

	it("uses a dry day only after the lake has filled", () => {
		expect(avoidFlood([0, 1, 1])).toEqual([]);
		expect(
			isValid([1, 0, 2, 0, 2, 1], avoidFlood([1, 0, 2, 0, 2, 1])),
		).toBeTrue();
	});

	it("finds a plan exactly when one exists on random inputs", () => {
		const random = createRandom(1488);
		for (let run = 0; run < 300; run++) {
			const rains = random.array(random.int(1, 8), 0, 3);
			const plan = avoidFlood(rains);
			if (plan.length > 0) expect(isValid(rains, plan)).toBeTrue();
			else expect(anyValid(rains)).toBeFalse();
		}
	});
});
