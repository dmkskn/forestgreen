/**
 * Writes a `text` to the clipboard.
 */
export default async function copy(text: string) {
	return await navigator.clipboard?.writeText(text);
}