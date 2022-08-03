
export function intOr(value: any, defaultValue: number): number {
    const result = parseInt(value)
    return isNaN(result) ? defaultValue : result
}

export function toSingleString(value: string | string[]): string {
    if (Array.isArray(value)) {
        return value.join(",")
    }
    return value
}
