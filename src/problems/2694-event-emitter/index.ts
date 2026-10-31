type Callback = (...args: never[]) => unknown;

/**
 * 2694. Event Emitter
 *
 * `subscribe(eventName, callback)` registers a callback and returns an
 * object whose `unsubscribe` removes it. `emit(eventName, args)` calls the
 * event's callbacks in the order they subscribed with `args`, and returns
 * their results. Subscribing the same callback twice registers it twice.
 *
 * Keep a set of subscriptions per event, wrapping each callback in its own
 * object so duplicate callbacks stay separate.
 *
 * @see https://leetcode.com/problems/event-emitter/
 * @difficulty Medium
 * @timeComplexity O(1) to subscribe or unsubscribe, O(s) to emit to s subscribers
 * @spaceComplexity O(s)
 *
 * @example
 * const emitter = new EventEmitter();
 * emitter.subscribe("sum", (a: number, b: number) => a + b);
 * emitter.emit("sum", [1, 2]); // [3]
 */
export class EventEmitter {
	readonly #events = new Map<string, Set<{ callback: Callback }>>();

	subscribe(
		eventName: string,
		callback: Callback,
	): { unsubscribe: () => void } {
		let subscriptions = this.#events.get(eventName);
		if (!subscriptions) {
			subscriptions = new Set();
			this.#events.set(eventName, subscriptions);
		}
		const subscription = { callback };
		subscriptions.add(subscription);
		return { unsubscribe: () => subscriptions.delete(subscription) };
	}

	emit(eventName: string, args: readonly unknown[] = []): unknown[] {
		return [...(this.#events.get(eventName) ?? [])].map(({ callback }) =>
			(callback as (...args: unknown[]) => unknown)(...args),
		);
	}
}
