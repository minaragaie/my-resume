type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[]

function clsx(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .map((input) => {
      if (typeof input === "string" || typeof input === "number") {
        return input.toString()
      }
      if (typeof input === "object" && input !== null) {
        return Object.entries(input)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ")
      }
      return ""
    })
    .join(" ")
    .trim()
}

function twMerge(classes: string): string {
  // Simple implementation - just return the classes as-is
  // In a full implementation, this would handle Tailwind class conflicts
  return classes
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // collapse groups of non-alphanumeric into one dash
    .replace(/^-+|-+$/g, "") // trim leading/trailing dashes
}
