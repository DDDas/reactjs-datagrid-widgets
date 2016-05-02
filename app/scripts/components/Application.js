import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
class Application extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation history={this.props.history}/>
         {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Application;