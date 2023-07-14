import { useState } from "react";

import { Button, Card, CardHeader, Container, Row, Col } from "reactstrap";
import ContentTable from "views/IndexSections/ContentTable.js";

const UserPage = () => {
  // const [activeNav, setActiveNav] = useState(1);

  // const toggleNavs = (e, userpage) => {
  //   e.preventDefault();
  //   setActiveNav(userpage);
  // };
  return (
    <>
      {/* Page content */}
      <Container className=" mb-4" fluid>
        <Row className="mt-1">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">List Document</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {/*SODAQOH*/}
              <ContentTable />
              {/**/}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserPage;
