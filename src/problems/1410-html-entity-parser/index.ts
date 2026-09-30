const ENTITIES: Record<string, string> = {
	"&quot;": '"',
	"&apos;": "'",
	"&amp;": "&",
	"&gt;": ">",
	"&lt;": "<",
	"&frasl;": "/",
};

/**
 * 1410. HTML Entity Parser
 *
 * Replaces the entities `&quot;`, `&apos;`, `&amp;`, `&gt;`, `&lt;` and
 * `&frasl;` in `text` with the characters they stand for.
 *
 * One pass with a regular expression over `&…;` sequences, so a decoded
 * `&` can't combine with the following text into a new entity.
 *
 * @see https://leetcode.com/problems/html-entity-parser/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * htmlEntityParser("&amp; is an HTML entity but &ambassador; is not."); // "& is an HTML entity but &ambassador; is not."
 */
export const htmlEntityParser = (text: string): string =>
	text.replace(/&[a-z]+;/g, (entity) => ENTITIES[entity] ?? entity);
