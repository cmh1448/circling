// Remove all HTML tags from a string and only return the text.
export function removeTags(html: string) {
  return html.replace(/(<([^>]+)>)/gi, "");
}
