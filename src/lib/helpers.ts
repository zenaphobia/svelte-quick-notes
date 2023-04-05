export const serializePOJOs = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}