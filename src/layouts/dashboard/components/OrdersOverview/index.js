import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useMaterialUIController, setTransactionName } from "context";
import TimelineItem from "../../../../examples/Timeline/TimelineItem";
import "./style.css";
import Server from "api/ServerApi";
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { styled, Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import { DatePicker } from "@mui/lab";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function OrdersOverview() {
  const [controller, dispatch] = useMaterialUIController();
  const { allTranctions, transactionName } = controller;

  // const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const [openPopup, setopenPopup] = useState(false);
  const [openAddPopup, setopenAddPopup] = useState(false);

  const [transactionType, settransactionType] = useState(0);
  const [transactionCategory, settransactionCategory] = useState(0);
  const [id, setid] = useState(0);
  const [amount, setamount] = useState(0);
  const [date, setdate] = useState("");
  const [memo, setmemo] = useState("");
  const [transactionTypeName, settransactionTypeName] = useState("income");
  const [transactionList, settransactionList] = useState([]);
  const [index, setindex] = useState(0);
  const [categoryList, setcategoryList] = useState([]);

  useEffect(async () => {
    settransactionList(allTranctions);
  }, [allTranctions]);

  useEffect(async () => {
    const data = await Server.getAllCategories();
    setcategoryList(data.response);
  }, []);

  const handleTransactionClick = (k, i) => {
    console.log("-------------------- handleTransactionClick ----------------", k.id);
    settransactionType(k.transactionType);
    settransactionCategory(k.transactionCategory);
    setid(k.id);
    setamount(parseFloat(k.amount));
    setdate(k.date);
    setmemo(k.memo);
    setopenPopup(true);
    settransactionTypeName(k.transactionType == 1 ? "income" : "expence");
    setindex(i);
  };

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    console.log("-------------------- id ----------------", id);
    console.log("-------------------- transactionType ----------------", transactionType);
    console.log("-------------------- transactionCategory ----------------", transactionCategory);
    console.log("-------------------- amount ----------------", amount);
    console.log("-------------------- date ----------------", date);
    console.log("-------------------- memo ----------------", memo);
    const data = await Server.updateTransaction(
      id,
      transactionType,
      transactionCategory,
      amount,
      date,
      memo
    );
    console.log("-------------------- data ----------------", data);
  };

  const handleAddFormSubmit = async (event) => {
    // event.preventDefault();
    console.log("-------------------- id ----------------", id);
    console.log("-------------------- transactionType ----------------", transactionType);
    console.log("-------------------- transactionCategory ----------------", transactionCategory);
    console.log("-------------------- amount ----------------", amount);
    console.log("-------------------- date ----------------", date);
    console.log("-------------------- memo ----------------", memo);
    const data = await Server.addTransaction(
      transactionType,
      transactionCategory,
      amount,
      date,
      memo
    );
    console.log("-------------------- addTransaction data ----------------", data);
  };

  const handleAddClick = () => {
    settransactionType(0);
    settransactionCategory(0);
    setid(0);
    setamount(0);
    setdate("");
    setmemo("");
    settransactionTypeName("");
    setopenAddPopup(true);
  };

  const handleTransCatChange = (event) => {
    settransactionCategory(event.target.value);
  };

  const handleTransTypeChange = (event) => {
    console.log("-------------------- handleTransTypeChange ----------------", event.target.value);
    settransactionType(event.target.value == "expence" ? 2 : 1);
    settransactionTypeName(event.target.value);
  };

  const remove = (index) => {
    settransactionList([...transactionList.slice(0, index), ...transactionList.slice(index + 1)]);
  };

  const handleClose = () => setopenPopup(false);
  const handleAddClose = () => setopenAddPopup(false);

  const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Backdrop = styled("div")`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  const style = {
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    p: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Transaction List
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {transactionList.map((_i, _index) => (
          // eslint-disable-next-line react/jsx-key
          <MDButton
            component="a"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            fullWidth
            onClick={() => handleTransactionClick(_i, _index)}
            key={_i}
          >
            <TimelineItem
              color={_i.transactionType == 2 ? "error" : "success"}
              icon="monetization_on"
              title={_i.amount}
              dateTime={_i.date}
            />
          </MDButton>
        ))}
        <MDButton
          component="a"
          target="_blank"
          rel="noreferrer"
          variant="gradient"
          fullWidth
          onClick={() => handleAddClick()}
        >
          ADD
        </MDButton>
        {openAddPopup && (
          <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={openAddPopup}
            onClose={handleAddClose}
            BackdropComponent={Backdrop}
          >
            <Box sx={style}>
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <form onSubmit={handleAddFormSubmit}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Transaction Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={transactionCategory}
                        label="transactionCategory"
                        onChange={handleTransCatChange}
                      >
                        {categoryList.map((e)=>(
                          <MenuItem value={e.id}>{e.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <br></br>
                  <br></br>
                  <TextField
                    key="jjjjjj"
                    id="standard-basic"
                    label="Amount"
                    variant="standard"
                    value={amount}
                    onInput={(e) =>
                      setamount(e.target.value == "" ? 0 : parseFloat(e.target.value))
                    }
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={date}
                    onInput={(e) => {
                      console.log("date -----------------> ", e.target.value);
                      setdate(e.target.value);
                    }}
                  />
                  <br></br>
                  <br></br>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Type</FormLabel>
                    <RadioGroup
                      aria-label="type"
                      defaultValue="income"
                      name="radio-buttons-group"
                      onChange={handleTransTypeChange}
                      value={transactionTypeName}
                    >
                      <FormControlLabel value="income" control={<Radio />} label="Income" />
                      <FormControlLabel value="expence" control={<Radio />} label="Expence" />
                    </RadioGroup>
                  </FormControl>
                  <br></br>
                  <br></br>
                  <TextField
                    key="dfdfdf"
                    id="standard-basic"
                    label="Momo"
                    variant="standard"
                    value={memo}
                    onInput={(e) => setmemo(e.target.value)}
                  />
                  <input type="submit" value="Submit" />
                </form>
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      setopenAddPopup(false);
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </Box>
          </StyledModal>
        )}
        {openPopup && (
          <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={openPopup}
            onClose={handleClose}
            BackdropComponent={Backdrop}
          >
            <Box sx={style}>
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <form onSubmit={handleFormSubmit}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Transaction Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={transactionCategory}
                        label="transactionCategory"
                        onChange={handleTransCatChange}
                      >
                        {categoryList.map((e)=>(
                          <MenuItem value={e.id}>{e.name}</MenuItem>
                        ))}
                        
                      </Select>
                    </FormControl>
                  </Box>
                  <br></br>
                  <br></br>
                  <TextField
                    key="jjjjjj"
                    id="standard-basic"
                    label="Amount"
                    variant="standard"
                    value={amount}
                    onInput={(e) =>
                      setamount(e.target.value == "" ? 0 : parseFloat(e.target.value))
                    }
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                  <br></br>
                  <br></br>
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={date}
                    onInput={(e) => {
                      console.log("date -----------------> ", e.target.value);
                      setdate(e.target.value);
                    }}
                  />
                  <br></br>
                  <br></br>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Type</FormLabel>
                    <RadioGroup
                      aria-label="type"
                      defaultValue="income"
                      name="radio-buttons-group"
                      onChange={handleTransTypeChange}
                      value={transactionTypeName}
                    >
                      <FormControlLabel value="income" control={<Radio />} label="Income" />
                      <FormControlLabel value="expence" control={<Radio />} label="Expence" />
                    </RadioGroup>
                  </FormControl>
                  <br></br>
                  <br></br>
                  <TextField
                    key="dfdfdf"
                    id="standard-basic"
                    label="Momo"
                    variant="standard"
                    value={memo}
                    onInput={(e) => setmemo(e.target.value)}
                  />
                  <input type="submit" value="Submit" />
                </form>
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      setopenPopup(false);
                    }}
                  >
                    close
                  </button>
                  <br></br>
                  <button
                    className="button"
                    onClick={async () => {
                      const data = await Server.deleteTransaction(id);
                      console.log("delete data -- > ", data);
                      remove(index);
                      setopenPopup(false);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </Box>
          </StyledModal>
        )}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
