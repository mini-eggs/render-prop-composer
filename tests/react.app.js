import React from "react";
import CreateComposer from "render-prop-composer";

const composeContainers = CreateComposer(React.createElement, React.Fragment);

const ExampleContainer = ({ children, ...props }) => (
  <React.Fragment children={children(props)} />
);

const ComposedContainers = composeContainers(
  props => <ExampleContainer {...props} greeting="Hi!" />,
  props => <ExampleContainer {...props} name="Evan" />,
  props => <ExampleContainer {...props} job="developer" />
);

const ExampleApp = () => (
  <ComposedContainers
    children={props => (
      <p>
        {props.greeting} My name is {props.name}. I work as a {props.job}.
      </p>
    )}
  />
);

export default ExampleApp;
