import { Heap } from "../../internal/heap";

/**
 * 1500. Design a File Sharing System
 *
 * Users share a file of `m` chunks. `join(ownedChunks)` assigns the
 * smallest free user id, `leave(userID)` frees it (and its chunks), and
 * `request(userID, chunkID)` returns the sorted ids of users owning the
 * chunk; if there are any, the requester then owns it too.
 *
 * Keeps each chunk's owners and each user's chunks in sets, and freed ids
 * in a min-heap so the smallest is reused first.
 *
 * @see https://leetcode.com/problems/design-a-file-sharing-system/
 * @difficulty Medium
 * @timeComplexity O(c + log u) per join or leave for c chunks, O(o log o) per request for o owners
 * @spaceComplexity O(users + chunks held)
 *
 * @example
 * const sharing = new DesignAFileSharingSystem(4);
 * sharing.join([1, 2]); // 1
 * sharing.join([2, 3]); // 2
 * sharing.request(1, 3); // [2]
 */
export class DesignAFileSharingSystem {
	readonly #owners = new Map<number, Set<number>>();
	readonly #chunksOf = new Map<number, Set<number>>();
	readonly #freed = new Heap<number>((a, b) => a - b);
	#nextId = 1;

	constructor(_m: number) {}

	join(ownedChunks: readonly number[]): number {
		let id = this.#freed.pop();
		if (id === undefined) {
			id = this.#nextId;
			this.#nextId++;
		}
		this.#chunksOf.set(id, new Set(ownedChunks));
		for (const chunk of ownedChunks) this.#ownersOf(chunk).add(id);
		return id;
	}

	leave(userID: number): void {
		for (const chunk of this.#chunksOf.get(userID) ?? [])
			this.#owners.get(chunk)?.delete(userID);
		this.#chunksOf.delete(userID);
		this.#freed.push(userID);
	}

	request(userID: number, chunkID: number): number[] {
		const owners = [...this.#ownersOf(chunkID)].sort((a, b) => a - b);
		if (owners.length > 0) {
			this.#ownersOf(chunkID).add(userID);
			this.#chunksOf.get(userID)?.add(chunkID);
		}
		return owners;
	}

	#ownersOf(chunk: number): Set<number> {
		const owners = this.#owners.get(chunk) ?? new Set<number>();
		this.#owners.set(chunk, owners);
		return owners;
	}
}
