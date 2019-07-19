import * as React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom';
import UserSection from './UserSection'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

configure({ adapter: new Adapter() });

// TODO - switch to shallow()
describe("UserSection", () => {
  let props;
  let mountedUserSection;
  const userSection = () => {
    if (!mountedUserSection) {
      mountedUserSection = mount(
        <Router>
          <UserSection {...props} />
        </Router>
      );
    }
    return mountedUserSection;
  }

  beforeEach(() => {
    props = {
      loggingOut: undefined,
      currentUser: undefined,
    };
    mountedUserSection = undefined;
  });

  it("always renders a div", () => {
    const divs = userSection().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("always renders a Grid", () => {
    const divs = userSection().find(Grid);
    expect(divs.length).toBeGreaterThan(0);
  });

  it("always renders a `TextField`", () => {
    expect(userSection().find(TextField).length).toBe(1);
  });

  it("always renders a logout `Button`", () => {
    expect(userSection().find(Button).length).toBe(1);
    expect(userSection().find(Button).text()).toBe('Log Out');
  });

  it("always renders a link to Login page", () => {
    expect(userSection().find('Link').prop('to')).toBe('/login');
  });

  describe("when `currentUser` is passed", () => {
    beforeEach(() => {
      props.currentUser = {
        id: 1, 
        userName: 'testUser'
      };
    });

    it("applies that currentUser username as a value property on the TextField", () => {
      const wrappingTextField = userSection().find(TextField).first();
      expect(wrappingTextField.props().value).toBe(props.currentUser.username);
    });
  });


  describe("when `currentUser` is not passed", () => {
    beforeEach(() => {
      props.currentUser = undefined
    })
    it("does not show a username as a value property on the TextField", () => {
      const wrappingTextField = userSection().find(TextField).first();
      expect(wrappingTextField.props().value).not.toBeDefined();
    });
  });



  describe("when `loggingOut` is defined", () => {
    beforeEach(() => {
      props.loggingOut = jest.fn();
    });

    it("sets the rendered `Button`'s `onClick` prop to the same value as `loggingOut`", () => {
      const logOutButton = userSection().find(Button);
      expect(logOutButton.props().onClick).toBe(props.loggingOut);
    });
  });


  describe("when `loggingOut` is undefined", () => {
    beforeEach(() => {
      props.loggingOut = undefined;
    });

    it("sets the rendered `Button`'s `onClick` prop to undefined", () => {
      const logOutButton = userSection().find(Button);
      expect(logOutButton.props().onClick).not.toBeDefined();
    });
  });


})