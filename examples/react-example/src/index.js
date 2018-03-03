import React from "react";
import { render } from "react-dom";

import CreateComposer from "render-prop-composer";

const Test = props => <React.Fragment>{props.children(props)}</React.Fragment>;

const Composed = CreateComposer(React.createElement, React.Fragment)(
  props => <Test name="Evan" {...props} />,
  props => <Test job="Developer" {...props} />
);

const App = () => (
  <Composed>
    {props => (
      <React.Fragment>
        {props.name} - {props.job}
      </React.Fragment>
    )}
  </Composed>
);

render(<App />, document.getElementById("root"));
