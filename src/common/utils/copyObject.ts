export function copyObject<T>(obj: T, setter: Partial<T>): T {
    const newObj = { ...(obj as any) };

    return Object.assign(newObj, setter);
}