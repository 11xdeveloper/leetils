/**
 * 1797. Design Authentication Manager
 *
 * Tokens expire `timeToLive` after they are generated or last renewed.
 * Supports generating, renewing unexpired tokens, and counting unexpired
 * tokens at a given time (expiry happens before other actions at the same
 * time).
 *
 * A map from token to expiry time. Times only increase, so expired tokens
 * are dropped whenever they're counted.
 *
 * @see https://leetcode.com/problems/design-authentication-manager/
 * @difficulty Medium
 * @timeComplexity O(1) per generate or renew, O(t) per count for t tokens
 * @spaceComplexity O(t)
 *
 * @example
 * const manager = new DesignAuthenticationManager(5);
 * manager.generate("aaa", 2);
 * manager.countUnexpiredTokens(6); // 1
 */
export class DesignAuthenticationManager {
	readonly #timeToLive: number;
	readonly #expiry = new Map<string, number>();

	constructor(timeToLive: number) {
		this.#timeToLive = timeToLive;
	}

	generate(tokenId: string, currentTime: number): void {
		this.#expiry.set(tokenId, currentTime + this.#timeToLive);
	}

	renew(tokenId: string, currentTime: number): void {
		if ((this.#expiry.get(tokenId) ?? 0) > currentTime)
			this.#expiry.set(tokenId, currentTime + this.#timeToLive);
	}

	countUnexpiredTokens(currentTime: number): number {
		for (const [tokenId, expiry] of this.#expiry)
			if (expiry <= currentTime) this.#expiry.delete(tokenId);
		return this.#expiry.size;
	}
}
