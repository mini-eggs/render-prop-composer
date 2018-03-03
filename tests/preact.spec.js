/** @jsx Preact.h */
import Preact from "preact";
import render from "preact-render-to-string";
import CreateComposer from "../dist/main.js";

/**
 * Setup
 */
const PreactComposer = CreateComposer(Preact.h, "div");

/**
 * Testing components
 */
const First = ({ children }) => (
  <div>{children.map(fn => fn({ name: "Evan" }))}</div>
);

const Second = ({ children }) => (
  <div>{children.map(fn => fn({ job: "Developer" }))}</div>
);

/**
 * Testing apps
 */
const RegularApp = () => (
  <First>
    {a => (
      <Second>
        {b => (
          <div>
            <div>
              {a.name} - {b.job}
            </div>
          </div>
        )}
      </Second>
    )}
  </First>
);

const Container = PreactComposer(First, Second);

const ComposedApp = () => (
  <Container>
    {props => (
      <div>
        {props.name} - {props.job}
      </div>
    )}
  </Container>
);

const Expecting = () => (
  <div>
    <div>
      <div>
        <div>Evan - Developer</div>
      </div>
    </div>
  </div>
);

/**
 * Tests
 */
describe("Ensure composing render props works for Preact.", () => {
  it("Ensure components have equal text content.", () => {
    const a = render(<RegularApp />);
    const b = render(<ComposedApp />);
    const expecting = render(<Expecting />);
    expect(a).toEqual(expecting);
    expect(b).toEqual(expecting);
    expect(a).toEqual(b);
  });
});
