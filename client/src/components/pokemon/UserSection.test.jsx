import * as React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme'
import UserSection from './UserSection'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

configure({ adapter: new Adapter() });

describe("UserSection", () => {
  let props;
 
  beforeEach(() => {
    props = {
      loggingOut: undefined,
      currentUser: undefined,
    };
  });

  it('should render correctly with no props', () => {
    const component = shallow(<UserSection />);
    expect(component).toMatchSnapshot();
  });

  it('always renders a Grid', () => {
    const wrapper = shallow(<UserSection />);
    expect(wrapper.find(Grid).length).toBeGreaterThan(0);
  });

  it('always renders a TextField', () => {
    const wrapper = shallow(<UserSection />);
    expect(wrapper.find(TextField).length).toBe(1);
  });

  it('always renders a logout `Button', () => {
    const wrapper = shallow(<UserSection />);
    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.find(Button).text()).toBe('Log Out');
  });

  it('always renders a link to Login page', () => {
    const wrapper = shallow(<UserSection />);
    expect(wrapper.find('Link').prop('to')).toBe('/login');
  });

  describe("when `currentUser` is passed", () => {
    beforeEach(() => {
      props.currentUser = {
        id: 1, 
        userName: 'testUser'
      };
    });

    it("applies that currentUser username as a value property on the TextField", () => {
      const wrappingTextField = shallow(<UserSection />).find(TextField).first();;
      expect(wrappingTextField.props().value).toBe(props.currentUser.username);
    });
  });


  describe("when `currentUser` is not passed", () => {
    it("does not show a username as a value property on the TextField", () => {
      const wrappingTextField = shallow(<UserSection />).find(TextField).first();;
      expect(wrappingTextField.props().value).not.toBeDefined();
    });
  });



  describe("when `loggingOut` is undefined", () => {
    beforeEach(() => {
      props.loggingOut = undefined;
    });

    it("sets the rendered `Button`'s `onClick` prop to undefined", () => {
      const logOutButton = shallow(<UserSection />).find(Button)
      expect(logOutButton.props().onClick).not.toBeDefined();
    });
  });

})