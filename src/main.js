export default (jsx, container) => (...containers) => ({ children }) => {
  const wrap = props =>
    typeof children === "function" // For react, in preact this is an array.
      ? children(props)
      : children.map(fn => fn(props));

  const gatherComponents = (parent, ...rest) => {
    const child =
      rest.length === 0
        ? props => jsx(container, null, wrap(props))
        : gatherComponents(...rest);

    return outerProps =>
      jsx(parent, outerProps, innerProps =>
        jsx(child, Object.assign({}, outerProps, innerProps))
      );
  };

  return gatherComponents(...containers)();
};
