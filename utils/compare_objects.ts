export function compareObject({
    object1,
    object2
}: {
    object1: {},
    object2: {},
}
): boolean {

    let item1 = JSON.stringify(object1)
    let item2 = JSON.stringify(object2)

    if (item1 === item2) {
        return true
    }
    return false
}