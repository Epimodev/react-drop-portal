function getScrollableParents(target: HTMLElement, parents: HTMLElement[] = []): HTMLElement[] {
  const { parentElement } = target;
  if (parentElement) {
    const isScrollable = parentElement.scrollHeight > parentElement.clientHeight;
    const newParents = isScrollable ? parents.concat(parentElement) : parents;
    return getScrollableParents(parentElement, newParents);
  }
  return parents;
}

function deepEquals<T extends object>(value1: T, value2: T): boolean {
  const keys = Object.keys(value1);
  for (let i = 0, l = keys.length; i < l; i += 1) {
    const key = keys[i];
    const isObject = typeof (value1 as any)[key] === 'object';
    const keyEquals = isObject
      ? deepEquals((value1 as any)[key], (value2 as any)[key])
      : (value1 as any)[key] === (value2 as any)[key];
    if (!keyEquals) {
      return false;
    }
  }

  return true;
}

export { getScrollableParents, deepEquals };
