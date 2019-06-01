function getScrollableParents(target: HTMLElement, parents: HTMLElement[] = []): HTMLElement[] {
  const { parentElement } = target;
  if (parentElement) {
    const isScrollable = parentElement.scrollHeight > parentElement.clientHeight;
    const newParents = isScrollable ? parents.concat(parentElement) : parents;
    return getScrollableParents(parentElement, newParents);
  }
  return parents;
}

export { getScrollableParents };
