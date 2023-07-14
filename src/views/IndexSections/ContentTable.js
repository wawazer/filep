import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { FcFolder, FcFile } from "react-icons/fc";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import { Input, Container, Row, Col } from "reactstrap";

var ls = require("local-storage");

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const columns = [
  {
    name: "Nama",
    selector: (row) =>
      row.url == null ? (
        <span name={row.doc_type}>
          <FcFolder /> {row.doc_type}
        </span>
      ) : (
        <span name={row.doc_type}>
          <FcFile /> {row.doc_type}
        </span>
      ),
  },
  {
    name: "Created Date",
    selector: (row) => row.date_,
  },
  {
    name: "#",
    selector: (row) =>
      row.url != null ? (
        <Button
          className="mr-4"
          variant="contained"
          href={row.url}
          target="_blank"
          size="sm"
        >
          DOWNLOAD
        </Button>
      ) : (
        // <a href={row.url} target="_blank">
        //   <FcDownload /> {row.doc_type}
        // </a>
        ""
      ),
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

var count = 0;
const URL = "http://ihub-dev.pelindo.co.id:99/api/BucketCollections/GetFolder";

const ClickToSelectTable = () => {
  let history = useHistory();

  if (ls.get("role_user") == null) {
    history.push("/login-page");
  }

  const [folder, setFolder] = useState([{}]);

  const [toggleCleared, setToggleCleared] = useState(false);

  const [trxnumber, setTrxNumber] = useState("");

  const [hide, setHide] = useState(false);

  const [loading, setLoading] = useState(false);

  const [theArray, setTheArray] = useState([
    {
      idrole: ls.get("role_user"),
      inpath: "",
      level: 1,
    },
  ]);

  const [link, setLink] = useState([]);

  const [infoData, setInfoData] = useState({
    data: {
      idrole: ls.get("role_user"),
      inpath: "",
      level: 1,
    },
  });

  function clickHandler(row) {
    if (count != 2) {
      setLoading(true);
      setTheArray((oldArray) => [
        ...oldArray,
        {
          idrole: infoData.data.idrole,
          inpath:
            row.doc_type.inpath != undefined
              ? row.doc_type.inpath
              : row.doc_type,
          level: infoData.data.level,
        },
      ]);

      axios
        .post(
          URL,
          {
            idrole: infoData.data.idrole,
            inpath:
              row.doc_type.inpath != undefined
                ? row.doc_type.inpath
                : row.doc_type,
            level: infoData.data.level,
          },
          {
            auth: {
              username: "dev_r2",
              password: "dev_r2",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          if (res.data.result.url != null) {
            return;
          } else {
            setFolder(res.data.result);

            var level = res.data.step;

            if (res.data.step == 6) {
              count = 2;
              setHide(true);
            } else {
              level = res.data.step;
            }
            setInfoData({
              data: {
                level: level,
                idrole: ls.get("role_user"),
                inpath: "",
              },
            });
          }
        })
        .catch((err) => {});
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    count = 0;
    await axios
      .post(URL, infoData.data, {
        auth: {
          username: "dev_r2",
          password: "dev_r2",
        },
      })
      .then((res) => {
        setLoading(false);
        setFolder(res.data.result);

        var level = 0;

        if (res.data.step == 0) {
          level = 6;
        } else {
          level = res.data.step;
        }
        setInfoData({
          data: {
            level: level,
            idrole: ls.get("role_user"),
            inpath: "",
          },
        });
      })
      .catch((err) => {});
  };

  const labelSubmit = (e) => {
    setLoading(true);
    count = 0;
    setTheArray(theArray.filter((item) => item.level <= e.level));
    setInfoData({
      data: {
        level: e.level + 1,
        idrole: ls.get("role_user"),
        inpath: "",
      },
    });

    axios
      .post(URL, e, {
        auth: {
          username: "dev_r2",
          password: "dev_r2",
        },
      })
      .then((res) => {
        setLoading(false);
        setFolder(res.data.result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const saveZip = (filename, urls) => {
    if (!urls) return;

    const zip = new JSZip();
    const folder = zip.folder("files"); // folder name where all files will be placed in

    urls.forEach((url) => {
      const blobPromise = fetch(url).then((r) => {
        if (r.status === 200) return r.blob();
        return Promise.reject(new Error(r.statusText));
      });
      const name = url.substring(url.lastIndexOf("/") + 1);
      folder.file(name, blobPromise);
    });

    zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, filename));
  };

  const handleChange = ({ selectedRows }) => {
    selectedRows.forEach(function (e) {
      setLink((prevArray) => [...prevArray, e.url]);
    });
  };

  const downloadAllFiles = () => {
    if (link.length <= 0) {
      alert("Silakan pilih file yang ingin di download");
    } else {
      saveZip("DownloadAll.zip", link);
      setLink([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const filterByDocNumber = async () => {
    setFolder([]);
    setTheArray([]);
    setLoading(true);
    count = 0;
    var bodyFormData = new FormData();

    bodyFormData.append("idrole", ls.get("role_user"));
    bodyFormData.append("draw", 1);
    bodyFormData.append("limit", 0);
    bodyFormData.append("offset", 10000);
    bodyFormData.append("search", trxnumber);

    await axios
      .post(
        "http://ihub-dev.pelindo.co.id:99/api/BucketCollections/Search?",
        bodyFormData,
        {
          auth: {
            username: "dev_r2",
            password: "dev_r2",
          },
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        setLoading(false);
        res.data.data.forEach(function (e) {
          setFolder((folders) => [
            ...folders,
            {
              doc_type: e.ID_TRX,
              url: null,
              date_: null,
            },
          ]);

          setInfoData({
            data: {
              level: 4,
              idrole: ls.get("role_user"),
              inpath: "",
            },
          });
        });

        res.data.data[0].PATH_FROM.forEach(function (d) {
          setTheArray((oldArray) => [...oldArray, d]);
        });
      })
      .catch((e) => {
        alert("Data tidak ditemukan ");
      });
  };

  return (
    <>
      <section className="section section-sm" style={{ paddingBottom: 0 }}>
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2" md="12">
              <Stack spacing={2}>
                <Breadcrumbs
                  className="breadcrumbsCustomStyle"
                  separator=""
                  aria-label="breadcrumb"
                >
                  {theArray.map((data, key) => (
                    <span
                      onClick={(e) => labelSubmit(data)}
                      style={{ marginLeft: 15 }}
                      key={key}
                      id={key + 1}
                      name={data.doc_type}
                    >
                      <FcFolder />{" "}
                      {data.inpath == "" ? "List Document" : data.inpath}
                      {<NavigateNextIcon fontSize="small" />}{" "}
                    </span>
                  ))}
                </Breadcrumbs>
              </Stack>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section section-sm justify-content-end">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2" md="12">
              <div className="row mt-lg-0" style={{ marginLeft: 5 }}>
                <Input
                  placeholder="Seach by Doc Number"
                  name="search"
                  id="1"
                  type="text"
                  autoComplete="off"
                  className="cari "
                  onChange={(e) => setTrxNumber(e.target.value)}
                />
                <Button
                  className="btn btn-outline-success mx-2"
                  href="#"
                  variant="contained"
                  sx={{
                    ":hover": {
                      bgcolor: "#00C4FF",
                      color: "black",
                    },
                  }}
                  onClick={(e) => filterByDocNumber()}
                >
                  SEARCH
                </Button>
                {hide == true && (
                  <Button
                    className="mr-4"
                    color="success"
                    href="#"
                    variant="contained"
                    sx={{
                      ":hover": {
                        bgcolor: "#AF5",
                        color: "black",
                      },
                    }}
                    onClick={(e) => downloadAllFiles()}
                  >
                    ZIP/DOWNLOAD
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {folder != null && (
        <DataTable
          title="List Data"
          columns={columns}
          data={folder}
          pagination
          onRowClicked={clickHandler}
          selectableRows
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggleCleared}
          paginationComponentOptions={paginationComponentOptions}
          progressPending={loading}
          paginationServer
          Clicked
        />
      )}
    </>
  );
};

export default ClickToSelectTable;
