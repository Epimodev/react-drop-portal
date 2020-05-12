function getScrollableParents(target: HTMLElement, parents: HTMLElement[] = []): HTMLElement[] {
  const { parentElement } = target;
  if (parentElement) {
    const isScrollable = parentElement.scrollHeight > parentElement.clientHeight;
    const newParents = isScrollable ? parents.concat(parentElement) : parents;
    return getScrollableParents(parentElement, newParents);
  }
  return parents;
}

function isEquals(value1: any, value2: any) {
  const isObject = typeof value1 === 'object';
  if (isObject) {
    return deepEquals(value1, value2);
  }
  if (isNaN(value1)) {
    return isNaN(value2);
  }
  return value1 === value2;
}

function deepEquals<T extends object>(value1: T, value2: T): boolean {
  const keys = Object.keys(value1);
  for (let i = 0, l = keys.length; i < l; i += 1) {
    const key = keys[i];

    if (!isEquals((value1 as any)[key], (value2 as any)[key])) {
      return false;
    }
  }

  return true;
}

export { getScrollableParents, deepEquals };
