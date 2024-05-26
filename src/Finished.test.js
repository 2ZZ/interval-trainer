import React from "react";
import renderer from "react-test-renderer";
import Finished from "./Finished";

it("finished renders as expected", () => {
  const component = renderer.create(<Finished routineFinished={true} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
