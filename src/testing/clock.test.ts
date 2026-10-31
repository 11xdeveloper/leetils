import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { FakeClock } from "./clock";

describe("FakeClock", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	it("fires timers and settles promises at the right time", async () => {
		const clock = new FakeClock();
		const log: number[] = [];
		setTimeout(() => log.push(clock.now), 30);
		new Promise((resolve) => setTimeout(resolve, 10))
			.then(() => new Promise((resolve) => setTimeout(resolve, 5)))
			.then(() => log.push(clock.now));
		await clock.advanceTo(100);
		expect(log).toEqual([15, 30]);
		expect(clock.now).toBe(100);
	});
});
