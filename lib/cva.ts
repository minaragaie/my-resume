type ClassValue = string | number | boolean | undefined | null
type ClassArray = ClassValue[]
type ClassDictionary = Record<string, any>
type ClassProp = ClassValue | ClassArray | ClassDictionary

export function cn(...inputs: ClassProp[]): string {
  return inputs.flat().filter(Boolean).join(" ").trim()
}

export type VariantProps<T extends (...args: any) => any> = Omit<Parameters<T>[0], "class" | "className">

export function cva(
  base: string,
  config?: {
    variants?: Record<string, Record<string, string>>
    defaultVariants?: Record<string, string>
  },
) {
  return (props: Record<string, any> = {}) => {
    let classes = base

    if (config?.variants) {
      Object.entries(config.variants).forEach(([key, variants]) => {
        const value = props[key] || config.defaultVariants?.[key]
        if (value && variants[value]) {
          classes += " " + variants[value]
        }
      })
    }

    return classes
  }
}
