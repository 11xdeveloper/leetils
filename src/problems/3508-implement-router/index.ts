/**
 * 3508. Implement Router
 *
 * A router holding at most `memoryLimit` packets `[source, destination,
 * timestamp]`. `addPacket` rejects duplicates and evicts the oldest packet
 * when full; `forwardPacket` removes and returns the oldest; `getCount`
 * counts stored packets for a destination with timestamps in a range.
 *
 * Packets arrive in timestamp order and leave oldest first, so keep a FIFO
 * queue, a set of stored packets, and per destination a queue of
 * timestamps (sorted, consumed from the front) to binary search.
 *
 * @see https://leetcode.com/problems/implement-router/
 * @difficulty Medium
 * @timeComplexity O(1) to add or forward, O(log n) per count
 * @spaceComplexity O(memoryLimit)
 *
 * @example
 * const router = new ImplementRouter(3);
 * router.addPacket(1, 4, 90); // true
 * router.getCount(4, 1, 100); // 1
 */
export class ImplementRouter {
	readonly #limit: number;
	readonly #queue: [number, number, number][] = [];
	#head = 0;
	readonly #stored = new Set<string>();
	readonly #byDestination = new Map<
		number,
		{ times: number[]; head: number }
	>();

	constructor(memoryLimit: number) {
		this.#limit = memoryLimit;
	}

	addPacket(source: number, destination: number, timestamp: number): boolean {
		const key = `${source},${destination},${timestamp}`;
		if (this.#stored.has(key)) return false;
		if (this.#queue.length - this.#head === this.#limit) this.forwardPacket();
		this.#queue.push([source, destination, timestamp]);
		this.#stored.add(key);
		const times = this.#byDestination.get(destination) ?? {
			times: [],
			head: 0,
		};
		times.times.push(timestamp);
		this.#byDestination.set(destination, times);
		return true;
	}

	forwardPacket(): number[] {
		if (this.#head === this.#queue.length) return [];
		const packet = this.#queue[this.#head++] ?? [0, 0, 0];
		const [source, destination, timestamp] = packet;
		this.#stored.delete(`${source},${destination},${timestamp}`);
		const times = this.#byDestination.get(destination);
		if (times) times.head++;
		return [...packet];
	}

	getCount(destination: number, startTime: number, endTime: number): number {
		const entry = this.#byDestination.get(destination);
		if (!entry) return 0;
		const firstAtLeast = (time: number): number => {
			let lo = entry.head;
			let hi = entry.times.length;
			while (lo < hi) {
				const mid = (lo + hi) >>> 1;
				if ((entry.times[mid] ?? 0) >= time) hi = mid;
				else lo = mid + 1;
			}
			return lo;
		};
		return firstAtLeast(endTime + 1) - firstAtLeast(startTime);
	}
}
