import { jest } from "bun:test";

const settle = async (): Promise<void> => {
	for (let i = 0; i < 20; i++) await Promise.resolve();
};

/**
 * A fake clock for testing timer-based solutions. It runs Bun's fake timers
 * a millisecond at a time and lets promise callbacks settle after each step,
 * so tests can check exactly when things happen, even through promises. Call
 * `jest.useFakeTimers()` before using one, and `jest.useRealTimers()` after.
 */
export class FakeClock {
	/** Milliseconds since the clock was created. */
	now = 0;

	/** Moves the clock forward to `time`, firing timers on the way. */
	async advanceTo(time: number): Promise<void> {
		await settle();
		while (this.now < time) {
			this.now++;
			jest.advanceTimersByTime(1);
			await settle();
		}
	}
}
