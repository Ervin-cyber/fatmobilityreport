import { Category } from "@/types/Category";
import { PortableTextBlock } from "next-sanity";

export const findNameById = (items: Category[], id: string): string | undefined => {
  const foundItem = items.find(item => item._id === id);
  return foundItem?.name;
};
export const findSlugById = (items: Category[], id: string): string | undefined => {
  const foundItem = items.find(item => item._id === id);
  return foundItem?.slug.current;
};
export function getPortableTextPreview(portableText?: PortableTextBlock[], wordLimit = 16, charLimit = 93) {
  if (!portableText) return "";

  // Extract only text from Portable Text blocks
  const text = portableText
    .filter(block => block._type === "block") // Ignore images, embeds, etc.
    .map(block => block.children.map(span => span.text).join(" ")) // Extract text
    .join(" ");
  // Apply truncation logic
  return truncateText(text, wordLimit, charLimit);
}
export function truncateText(text: string, wordLimit = 16, charLimit = 93) {
  // Trim whitespace
  text = text.trim();

  // Limit by character count
  if (text.length > charLimit) {
    return text.substring(0, charLimit) + "...";
  }

  // Limit by word count
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text; // No need to trim
}
