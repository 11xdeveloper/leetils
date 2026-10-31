/**
 * 2650. Design Cancellable Function
 *
 * Run a generator that yields promises, sending each promise's value back
 * into it (or throwing its rejection into it), and return `[cancel,
 * promise]`. `promise` settles with the generator's return value or uncaught
 * error. Calling `cancel` before then throws `"Cancelled"` into the
 * generator, so `promise` rejects with it unless the generator catches it
 * and returns.
 *
 * Drive the generator from an async loop, racing each yielded promise
 * against one that `cancel` rejects.
 *
 * @see https://leetcode.com/problems/design-cancellable-function/
 * @difficulty Hard
 * @timeComplexity O(1) per yielded promise
 * @spaceComplexity O(1)
 *
 * @example
 * const [cancel, promise] = designCancellableFunction(
 *   (function* () {
 *     yield new Promise((resolve) => setTimeout(resolve, 200));
 *     return "Success";
 *   })(),
 * );
 * setTimeout(cancel, 100); // promise rejects with "Cancelled" at 100ms
 */
export function designCancellableFunction<T>(
	generator: Generator<Promise<unknown>, T, unknown>,
): [cancel: () => void, promise: Promise<T>] {
	let cancel = (): void => {};
	const cancelled = new Promise<never>((_, reject) => {
		cancel = () => reject("Cancelled");
	});
	cancelled.catch(() => {});
	const run = async (): Promise<T> => {
		let step = generator.next();
		while (!step.done) {
			try {
				step = generator.next(await Promise.race([step.value, cancelled]));
			} catch (error) {
				step = generator.throw(error);
			}
		}
		return step.value;
	};
	return [cancel, run()];
}
