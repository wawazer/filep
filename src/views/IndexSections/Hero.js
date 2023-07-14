import React from "react";
import "assets/css/stylesbasic.css";
import "assets/css/home.css";

import { Container, Row, Col } from "reactstrap";

class Hero extends React.Component {
  render() {
    return (
      <>
        <section className="banner-home">
          {/* <figure>
            <img src="images/content/banner-home.png" alt="" />
    </figure>*/}
          <div className="asset-home">
            <div className="box-container">
              <div className="bg">
                <img
                  src={require("assets/img/zen-1.png")}
                  className="img-fluid floating"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="wrap-banner">
            <div className="left-banner">
              <figcaption className="text">
                <h1
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  Connect through Sharing
                </h1>
              </figcaption>
            </div>
            <div className="right-banner">
              <div className="text">
                <p style={{ fontWeight: "700" }}>
                  Store, share, and collaborate on files and folders from your
                  mobile device, tablet, or computer
                </p>
              </div>
              <div className="text2">
                <p style={{ fontWeight: "300", fontSize: "14px" }}>
                  PT. PELABUHAN INDONESIA (PERSERO)
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Hero;
