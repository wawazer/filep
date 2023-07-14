import React from "react";
import Navbar from "components/Navbars/Navbar.js";
import Hero from "./IndexSections/Hero.js";
import ContentSecure from "./IndexSections/ContentSecure.js";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <Navbar />
        <main ref="main">
          <Hero />
          {/*<ContentSecure />*/}
        </main>
      </>
    );
  }
}

export default Index;
