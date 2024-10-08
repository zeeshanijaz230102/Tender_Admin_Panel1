import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Button, Modal } from "reactstrap";
import { billingApiServices } from '../../services/BillingApiService';
import Toast from "../alert/Toast"
import "./ImportFile.css";

import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import { CheckSquare } from 'react-feather';
import { localStorageService } from "../../services/LocalStorageService";

function ImportFile(props) {
    const [names, setNames] = useState([]);
    const [importDialog, setImportDialog] = useState(true);
    const [modal, setModal] = useState(false);
    const _userData = localStorageService.getPersistedData("USER_DETAILS")
    const [severity, setSeverity] = useState("")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [responseMsg, setResponseMsg] = useState("")

    useEffect(() => {
        if (props.isOpen) {
            setModal(true)
        }
        // if cache store pass to display in pass and confirm pass field that would be set empty

    }, [props.isOpen])

    const handleToast = (severity, message) => {
        setSeverity(severity)
        setResponseMsg(message)
        setOpenSnackBar(true)
        setTimeout(() => {
            setOpenSnackBar(false)
        }, 2000);
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const data = evt?.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
            const sheet = workbook.Sheets[sheetName];
            const columnData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });

            // Assuming the "Name" column is the first column (index 0)
            const namesArray = columnData.map((e) => ({ name: e[0] }));
            const modifiedNamesArray = namesArray.slice(1);
                      
            setNames(modifiedNamesArray);
        };

        reader.readAsBinaryString(file);
    };

    const importRecords = () => {
        if (names?.length == 0) {
            alert("select file with records")
            return;
        }
        const body = {
            values: names,
            effectedBy: _userData?.id
        }
        
        if (props.Type == "Cities") {
            billingApiServices.importToExcelCities(body).then((response) => {
                if (response == null || response == undefined) {
                    handleToast("error", "associated with some tenders,please remove the tender at first(Null)")
                    return
                }

                if (response?.data?.status) {

                    handleToast("success", response?.data?.message)
                    props.reloadData()
                    onHide()
                }
                else {
                    handleToast("error", "associated with some tenders,please remove the tender at first.")
                }
            });
        }

        if (props.Type == "Newspaper") {
            billingApiServices.importToExcelNewspaper(body).then((response) => {
                if (response == null || response == undefined) {
                    handleToast("error", "associated with some tenders,please remove the tender at first(Null)")
                    return
                }

                if (response?.data?.status) {

                    handleToast("success", response?.data?.message)
                    props.reloadData()
                    onHide()
                }
                else {
                    handleToast("error", "associated with some tenders,please remove the tender at first.")
                }
            });
        }
        if (props.Type == "Category") {
            billingApiServices.importToExcelCategory(body).then((response) => {
                if (response == null || response == undefined) {
                    handleToast("error", "associated with some tenders,please remove the tender at first.")
                    return
                }

                if (response?.data?.status) {

                    handleToast("success", response?.data?.message)
                    props.reloadData()
                    setModal(false)
                    //onHide()
                }
                else {
                    handleToast("error", "associated with some tenders,please remove the tender at first.")
                }
            });
        }
        else {
            billingApiServices.importToExcel(body).then((response) => {
                if (response == null || response == undefined) {
                    handleToast("error", "associated with some tenders,please remove the tender at first.")
                    return
                }

                if (response?.data?.status) {
                   
                    handleToast("success", response?.data?.message)
                    props.reloadData()
                    onHide()
                }
                else {
                    handleToast("error", "associated with some tenders,please remove the tender at first.")
                }
            });
        }
        



    }
    const onHide = () => {
        setNames([])
        setModal(false)
        props.onHide()
    }


    return (
        <div>
            <Modal
                size="lg"
                isOpen={modal}
                toggle={() => onHide()}
                backdrop="static"
            >
                <div className="modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        Import Data Only From Excel File
                        </div>
                        <p>
                            <span className='ml-3'>Important Notes:</span>
                            <ul className='text-danger fs-4'>

                                <li>
                                    <p>
                                        In Excel file write proper column headings and follow same order as you see in table.
                                        Date is auto generated (Current date will be added to date column.  Change date after data added)
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Write only name in excel file.
                                    </p>
                                </li>

                            </ul>
                        </p>
                    </div>
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="px-1">
                                        <Form>
                                            <div className="form-body">
                                                <Row>
                                                    <Col xs="12">
                                                        <input className='NofileSelINdarkMopde' type="file" onChange={handleFileChange} accept=".xlsx, .xls" />

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="12">
                                                        <div className='contant'>
                                                            <ul>
                                                            <table>
                                                                <thead>
                                                                    <tr className='d-flex gap-4' >
                                                                        
                                                                        <th className='textofExcelFileIndarkMode'>Name</th>
                                                                        
                                                                    </tr>
                                                                </thead>
                                                                
                                                                </table>

                                                                {names?.map((ele, index) => (
                                                                    <li className='textofExcelFileIndarkMode' key={index}>{ele.name}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>

                                        <div className="form-actions">
                                            <Button
                                                color="warning"
                                                className="mr-3"
                                                onClick={() => onHide()}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={(e) => importRecords(e)}
                                            >
                                                <CheckSquare size={16} color="#FFF" /> Save
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Modal>
            <Toast open={openSnackBar}
                severity={severity}
                handleClose={() => setOpenSnackBar(false)}
                message={responseMsg} />
        </div>
    );
}

export default ImportFile;
