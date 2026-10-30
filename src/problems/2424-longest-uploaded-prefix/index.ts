/**
 * 2424. Longest Uploaded Prefix
 *
 * Videos 1 to `n` are uploaded in any order. Reports the longest prefix
 * `1..i` fully uploaded.
 *
 * The prefix only grows, so advance a pointer past uploaded videos.
 *
 * @see https://leetcode.com/problems/longest-uploaded-prefix/
 * @difficulty Medium
 * @timeComplexity O(1) amortised per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const server = new LongestUploadedPrefix(4);
 * server.upload(3);
 * server.longest(); // 0
 */
export class LongestUploadedPrefix {
	readonly #uploaded: Uint8Array;
	#prefix = 0;

	constructor(n: number) {
		this.#uploaded = new Uint8Array(n + 2);
	}

	upload(video: number): void {
		this.#uploaded[video] = 1;
		while (this.#uploaded[this.#prefix + 1]) this.#prefix++;
	}

	longest(): number {
		return this.#prefix;
	}
}
