export const kebabCase = (...value: string[]) => {
    return value.join("-").replaceAll(" ", '-')
}
