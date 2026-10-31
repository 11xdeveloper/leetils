import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { FakeClock } from "../../testing/clock";
import { delayTheResolutionOfEachPromise } from ".";

describe("2821. Delay the Resolution of Each Promise", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	const run = async (functions: (() => Promise<unknown>)[], ms: number) => {
		const clock = new FakeClock();
		const times: unknown[] = functions.map(() => undefined);
		delayTheResolutionOfEachPromise(functions, ms).forEach((fn, i) => {
			fn().then(
				() => {
					times[i] = clock.now;
				},
				() => {
					times[i] = -clock.now;
				},
			);
		});
		await clock.advanceTo(500);
		return times;
	};
	const after =
		(ms: number, fail = false) =>
		() =>
			new Promise((resolve, reject) => setTimeout(fail ? reject : resolve, ms));

	it("solves the examples from the problem statement", async () => {
		expect(await run([after(30)], 50)).toEqual([80]);
		expect(await run([after(50), after(80)], 70)).toEqual([120, 150]);
	});

	it("delays rejections too", async () => {
		expect(await run([after(20, true)], 30)).toEqual([-50]);
	});
});
