/**
 * 2227. Encrypt and Decrypt Strings
 *
 * Encrypts by replacing each character `keys[i]` with `values[i]` (two
 * letters). Decrypting counts the dictionary words that encrypt to the
 * given string.
 *
 * Encryption is a lookup. Since several keys may share a value, decrypt
 * by encrypting the whole dictionary up front and counting the results.
 *
 * @see https://leetcode.com/problems/encrypt-and-decrypt-strings/
 * @difficulty Hard
 * @timeComplexity O(total dictionary length) to build, O(n) per call
 * @spaceComplexity O(total dictionary length)
 *
 * @example
 * const encrypter = new EncryptAndDecryptStrings(["a", "b", "c", "d"], ["ei", "zf", "ei", "am"], ["abcd", "acbd", "adbc", "badc", "dacb", "cadb", "cbda", "abad"]);
 * encrypter.encrypt("abcd"); // "eizfeiam"
 * encrypter.decrypt("eizfeiam"); // 2
 */
export class EncryptAndDecryptStrings {
	readonly #codes: Map<string, string>;
	readonly #decryptions = new Map<string, number>();

	constructor(
		keys: readonly string[],
		values: readonly string[],
		dictionary: readonly string[],
	) {
		this.#codes = new Map(keys.map((key, i) => [key, values[i] ?? ""]));
		for (const word of dictionary) {
			const encrypted = this.encrypt(word);
			if (encrypted === "") continue;
			this.#decryptions.set(
				encrypted,
				(this.#decryptions.get(encrypted) ?? 0) + 1,
			);
		}
	}

	encrypt(word1: string): string {
		let encrypted = "";
		for (const char of word1) {
			const code = this.#codes.get(char);
			if (code === undefined) return "";
			encrypted += code;
		}
		return encrypted;
	}

	decrypt(word2: string): number {
		return this.#decryptions.get(word2) ?? 0;
	}
}
