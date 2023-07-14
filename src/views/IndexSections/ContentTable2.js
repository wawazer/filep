import axios from "axios";
import React, { useEffect, useState,  } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import DataTable from 'react-data-table-component';

import { FcFolder, FcDownload, FcFile } from 'react-icons/fc';
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
var ls = require('local-storage');

const selectRowProp = {
  mode: "checkbox",
  clickToSelect: true, // enable click to select
};

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const columns = [
  {
    name: 'Nama',
    selector: row => row.url == null ? <label><FcFolder />  {row.doc_type}</label> : <label><FcFile />  {row.doc_type}</label>,
  },
  {
    name: 'Tahun',
    selector: row => row.date_,
  },
  {
    name: '#',
    selector: row => row.url != null ? <a href={row.url} target="_blank"><FcDownload /> {row.doc_type}</a> : ""
  },
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
]


var count = 0;
var listUrl = [];
const URL = "http://ihub-dev.pelindo.co.id:99/api/BucketCollections/getDataDokumenByDocNo";


const ClickToSelectTable2 = () => {
    const {companycode, appcode, docno, doctype} = useParams();


    let history = useHistory();

  if (ls.get('role_user') == null) {
    history.push('/login-page')
  }

  const [folder, setFolder] = useState([{}]);

  const [trxnumber, setTrxNumber] = useState('')

  const [theArray, setTheArray] = useState([{
    idrole: ls.get('role_user'),
    inpath: '',
    level: 1
  }]);

  const [link, setLink] = useState([]);

  const [infoData, setInfoData] = useState({
    data: {
      idrole: ls.get('role_user'),
      inpath: '',
      level: 1
    }
  });

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {


    var bodyFormData = new FormData();

    bodyFormData.append('companycode', companycode);
    bodyFormData.append('appcode', appcode);
    bodyFormData.append('docno', docno);
    bodyFormData.append('doctype', doctype);

    await axios.post(URL, {
        companycode:companycode,
        appcode:appcode,
        docno:docno,
        doctype:doctype
    }, {
      auth: {
        username: 'dev_r2',
        password: 'dev_r2'
      }
    })
      .then(res => {
        setFolder(res.data.result)

        var level = 0;

        if (res.data.step == 0) {
          level = 6;
        } else {
          level = res.data.step
        }
        setInfoData({
          data: {
            level: level,
            idrole: ls.get('role_user'),
            inpath: ''
          }
        });
      })
      .catch(err => {

      })
  }

 
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
      setLink(prevArray => [...prevArray, e.url])
    })
  };

  

  const downloadAllFiles = () => {

    const dataLink = [
      "https://ho-bios.pelindo.co.id/UploadedFiles/BIOS/20230517100726.pdf",
      "https://ho-bios.pelindo.co.id/UploadedFiles/BIOS/20230607182938.pdf",
      "https://ho-bios.pelindo.co.id/UploadedFiles/BIOS/20230607182750.pdf"
    ]

    saveZip('DownloadAll.zip',dataLink)
  }

 
  return (

    <>
      <div className="card-profile-actions py-4 mt-lg-0">
        <Button
          className="mr-4"
          color="success"
          href="#"
          onClick={(e) => downloadAllFiles()}
          size="sm"
        >
          ZIP/DOWNLOAD
        </Button>
      </div>
      {
        <DataTable
          fixedHeader
          title="List Data"
          columns={columns}
          data={folder}
          pagination
          selectableRows
          onSelectedRowsChange={handleChange}
          paginationComponentOptions={paginationComponentOptions}
        />
      }

    </>
  );
}

export default ClickToSelectTable2;
