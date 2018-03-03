export default (jsx, container) => (...containers) => ({ children }) => {
  const gatherComponents = (parent, ...rest) => {
    const child =
      rest.length === 0
        ? props => jsx(container, null, children.map(fn => fn(props)))
        : gatherComponents(...rest);

    return outerProps =>
      jsx(parent, outerProps, innerProps =>
        jsx(child, Object.assign({}, outerProps, innerProps))
      );
  };

  return gatherComponents(...containers)();
};
