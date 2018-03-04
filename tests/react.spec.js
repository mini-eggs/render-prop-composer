import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateComposer from "../dist/main.js";
import ExampleApp from "./react.app";

/**
 * Setup
 */
Enzyme.configure({ adapter: new Adapter() });
const ReactComposer = CreateComposer(React.createElement, React.Fragment);

/**
 * Testing components
 */
class First extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Evan"
    };
  }
  render() {
    return (
      <React.Fragment>
        {this.props.children({ ...this.state, ...this.props })}
      </React.Fragment>
    );
  }
}

class Second extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: "Developer"
    };
  }
  render() {
    return (
      <React.Fragment>
        {this.props.children({ ...this.state, ...this.props })}
      </React.Fragment>
    );
  }
}

/**
 * Testing apps
 */
const RegularApp = () => (
  <First>
    {a => (
      <Second>
        {b => <React.Fragment>{JSON.stringify({ ...a, ...b })}</React.Fragment>}
      </Second>
    )}
  </First>
);

const Container = ReactComposer(First, Second);

const ComposedApp = () => (
  <Container>
    {props => <React.Fragment>{JSON.stringify({ ...props })}</React.Fragment>}
  </Container>
);

/**
 * Tests
 */
describe("Ensure composing render props works for React.", () => {
  it("Ensure components have equal text content.", () => {
    const a = Enzyme.mount(<RegularApp />).text();
    const b = Enzyme.mount(<ComposedApp />).text();
    const expecting = { name: "Evan", job: "Developer" };
    expect(a).toEqual(JSON.stringify(expecting));
    expect(b).toEqual(JSON.stringify(expecting));
    expect(a).toEqual(b);
  });

  it("Looks pretty, code-wise.", () => {
    expect(Enzyme.mount(<ExampleApp />).text()).toEqual(
      "Hi! My name is Evan. I work as a developer."
    );
  });
});
