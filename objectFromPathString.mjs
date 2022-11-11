function getObjVal(obj, path) {
    return setObjVal(obj, path, null);
}

function setObjVal(obj, path, val) {
    const { objAtPath, lastKey } = createObjectFromPath(obj, path);
    return val !== undefined ? (objAtPath[lastKey] = val) : objAtPath[lastKey];
}

function createObjectFromPath(obj, path) {
    let currentWorkingObject = obj;
    const { pathSplit, lastKey } = getPathSplit(path);
    pathSplit.reduce((_thisKey, nextKey) => {
        const thisKey = _thisKey.replaceAll("\\", "");
        make(thisKey)
            .onThe(currentWorkingObject)
            .anObjectOrArrayDependingOn(nextKey);
        currentWorkingObject = currentWorkingObject[thisKey];
        return nextKey;
    });
    return { objAtPath: currentWorkingObject, lastKey };
}

function getPathSplit(path) {
    // splits complex path strings like "deeply.nested[9][1][asdf].asdf.0.1.and.even.escaping\\[brackets\\]and\\.periods\\."
    // into ['deeply', 'nested', '9', '1', 'asdf', 'asdf', '0', '1', 'and', 'even', 'escaping\\[brackets\\]and\\.periods\\.']
    const pathSplit = path.split(/\]\[|\]\.|(?<!\\)\[|(?<!\\)\.|(?<!\\)\]/g);
    if (pathSplit.at(-1) === "") pathSplit.pop();
    return { pathSplit, lastKey: pathSplit.at(-1).replaceAll("\\", "") };
}

function make(thisKey) {
    let currentWorkingObject = null;

    const anObjectOrArrayDependingOn = (nextKey) => {
        if (currentWorkingObject[thisKey]) return;
        Number.isInteger(Number(nextKey))
            ? (currentWorkingObject[thisKey] = [])
            : (currentWorkingObject[thisKey] = {});
    };

    const onThe = (cwo) => {
        currentWorkingObject = cwo;
        return { anObjectOrArrayDependingOn };
    };
    return { onThe };
}

export { getObjVal, setObjVal };
