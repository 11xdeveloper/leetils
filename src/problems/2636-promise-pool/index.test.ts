import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { FakeClock } from "../../testing/clock";
import { promisePool } from ".";

describe("2636. Promise Pool", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	const finishTime = async (times: number[], n: number) => {
		const clock = new FakeClock();
		let finished = -1;
		promisePool(
			times.map((t) => () => new Promise((resolve) => setTimeout(resolve, t))),
			n,
		).then(() => {
			finished = clock.now;
		});
		await clock.advanceTo(2000);
		return finished;
	};

	it("solves the examples from the problem statement", async () => {
		expect(await finishTime([300, 400, 200], 2)).toBe(500);
		expect(await finishTime([300, 400, 200], 5)).toBe(400);
		expect(await finishTime([300, 400, 200], 1)).toBe(900);
	});

	it("resolves at once with no functions", async () => {
		expect(await finishTime([], 3)).toBe(0);
	});
});
