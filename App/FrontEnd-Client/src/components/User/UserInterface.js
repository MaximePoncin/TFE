import React, {Component} from 'react';

import Header from '../Header/Header';
import Navigation from './Navigation/Navigation';
import Container from './Container/Container';
import Footer from './Footer/Footer';

class UserInterface extends Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          changeLanguage={this.props.handleChangeLanguage}
          changeElmToRender={this.props.changeElmToRender}
          connect={this.props.connect}
          disconnect={this.props.disconnect}
          isConnected={this.props.isConnected}
          changeLang={this.props.changeLang}
        />
        <Navigation
          changeElmToRender={this.props.changeElmToRender}
        />
        <Container
          concernedItemId={this.props.concernedItemId}
          renderingElm={this.props.renderingElm}
          changeElmToRender={this.props.changeElmToRender}
        />
        <Footer
          changeElmToRender={this.props.changeElmToRender}
        />
      </React.Fragment>
    );
  }
}

export default UserInterface;
