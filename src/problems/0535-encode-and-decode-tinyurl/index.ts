/**
 * 535. Encode and Decode TinyURL
 *
 * A URL shortener: `encode` turns a URL into a short one, and `decode`
 * turns the short URL back into the original. LeetCode names these
 * functions `encode` and `decode`; here they're methods of one class, so
 * each instance keeps its own table.
 *
 * Gives each new URL the next number, written in base 62, as its code, and
 * stores the mapping both ways so encoding the same URL twice gives the
 * same short URL.
 *
 * @see https://leetcode.com/problems/encode-and-decode-tinyurl/
 * @difficulty Medium
 * @timeComplexity O(n) per call for a URL of length n
 * @spaceComplexity O(total length of the URLs encoded)
 *
 * @example
 * const codec = new EncodeAndDecodeTinyurl();
 * codec.decode(codec.encode("https://leetcode.com/problems/design-tinyurl")); // "https://leetcode.com/problems/design-tinyurl"
 */
export class EncodeAndDecodeTinyurl {
	static readonly #prefix = "http://tinyurl.com/";
	static readonly #alphabet =
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	readonly #shortByLong = new Map<string, string>();
	readonly #longByCode = new Map<string, string>();

	encode(longUrl: string): string {
		const existing = this.#shortByLong.get(longUrl);
		if (existing) return existing;

		const alphabet = EncodeAndDecodeTinyurl.#alphabet;
		let code = "";
		for (
			let id = this.#longByCode.size;
			code === "" || id > 0;
			id = Math.floor(id / 62)
		) {
			code = alphabet.charAt(id % 62) + code;
		}

		const shortUrl = EncodeAndDecodeTinyurl.#prefix + code;
		this.#longByCode.set(code, longUrl);
		this.#shortByLong.set(longUrl, shortUrl);
		return shortUrl;
	}

	decode(shortUrl: string): string {
		return (
			this.#longByCode.get(
				shortUrl.slice(EncodeAndDecodeTinyurl.#prefix.length),
			) ?? ""
		);
	}
}
