import React from "react";
import { Card, Col, CardBody, Button, Container, Row } from "reactstrap";

class BasicElements extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg pt-lg-0 mt--150">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row className="row-grid">
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                          <i className="ni ni-check-bold" />
                        </div>
                        <h6 className="text-primary text-uppercase">
                          Hasil Pengadaan
                        </h6>
                        <p className="description mt-3">
                          informasi hasil pengadaan yang telah selesai
                          dilakukan.
                        </p>
                        <Button
                          className="mt-4"
                          color="primary"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Learn more
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                          <i className="ni ni-istanbul" />
                        </div>
                        <h6 className="text-success text-uppercase">
                          Daftar Penyedia Terseleksi
                        </h6>
                        <p className="description mt-3">
                          Berisi daftar penyedia yang telah ditetapkan sebagai
                          Penyedia Terseleksi
                        </p>
                        <Button
                          className="mt-4"
                          color="success"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Learn more
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                          <i className="ni ni-planet" />
                        </div>
                        <h6 className="text-warning text-uppercase">
                          Berita Secure
                        </h6>
                        <p className="description mt-3">
                          Media komunikasi dan informasi yang disampaikan kepada
                          pengguna aplikasi
                        </p>
                        <Button
                          className="mt-4"
                          color="warning"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          Learn more
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default BasicElements;
