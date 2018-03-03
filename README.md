# Render Prop Composer

Compatible with both React and Preact.

#### Instead of:

```javascript
import React from "react";

export default () => (
  <ContainerOne>
    {first => (
      <ContainerTwo>
        {second => (
          <React.Fragment>
            <h1>first.name</h1>
            <h1>second.description</h1>
          </React.Fragment>
        )}
      </ContainerTwo>
    )}
  </ContainerOne>
);
```

#### Do this:

```javascript
import React from "react";
import CreateComposer from "render-prop-composer";

const composer = CreateComposer(React.createElement, React.Fragment);
const Composed = composer(ContainerOne, ContainerTwo);

export default () => (
  <Composed>
    {props => (
      <React.Fragment>
        <h1>props.name</h1>
        <h1>props.description</h1>
      </React.Fragment>
    )}
  </Composed>
);
```
