/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Server from "api/ServerApi";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import TextField from "@mui/material/TextField";

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Soft UI Dashboard Materail-UI example components
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import {
  useMaterialUIController,
  setEditCatPopOpen,
  setSelectedCatName
} from "context";

function Projects() {

  const [menu, setMenu] = useState(null);
  const [category, setcategory] = useState(null);
  const [newCategory, setnewCategory] = useState("");
  const [openCat, setopenCat] = useState(false);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const [controller, dispatch] = useMaterialUIController();
  const { editCatPopOpen, selectedCatId, selectedCatName } = controller;

  useEffect(async () => {
    const data = await Server.getAllCategories();
    setcategory(data.response);
    console.log("getAllCategories ------------->   ", data.response )
  }, []);

  const { columns, rows } = data(category);

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


  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    const data = await Server.addCategory(
      newCategory
    );
    console.log("-------------------- handleFormSubmit ----------------", data);
  };

  const handleFormEditSubmit = async (event) => {
    // event.preventDefault();
    const data = await Server.editCategory(
      selectedCatId, selectedCatName
    );
    console.log("-------------------- handleFormSubmit ----------------", data);
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={()=>{setopenCat(true); setMenu(null)}}>Add</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Categories
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            {/* <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon> */}
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong></strong>
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
      {openCat && (
          <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={openCat}
            onClose={()=>setopenCat(false)}
            BackdropComponent={Backdrop}
          >
            <Box sx={style}>
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <form onSubmit={handleFormSubmit}>
                  <TextField
                    key="jjjjjj"
                    id="standard-basic"
                    label="Category"
                    variant="standard"
                    value={newCategory}
                    onInput={(e) =>
                      setnewCategory(e.target.value)
                    }
                  />
                  <br></br>
                  <br></br>
                  <input type="submit" value="Add" />
                </form>
                <div className="actions">
                  <button
                    className="button"
                    onClick={closeMenu}
                  >
                    close
                  </button>
                </div>
              </div>
            </Box>
          </StyledModal>
        )}
        {editCatPopOpen && (
          <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={editCatPopOpen}
            onClose={()=>setEditCatPopOpen(dispatch, false)}
            BackdropComponent={Backdrop}
          >
            <Box sx={style}>
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <form onSubmit={handleFormEditSubmit}>
                  <TextField
                    key="jjjjjj"
                    id="standard-basic"
                    label="Category"
                    variant="standard"
                    value={selectedCatName}
                    onInput={(e) =>
                      setSelectedCatName(dispatch, e.target.value)
                    }
                  />
                  <br></br>
                  <br></br>
                  <input type="submit" value="Save" />
                </form>
                <div className="actions">
                  <button
                    className="button"
                    onClick={closeMenu}
                  >
                    close
                  </button>
                  <br></br>
                  <button
                    className="button"
                    onClick={async () => {
                      const data = await Server.deleteCategory(selectedCatId);
                      console.log("delete data -- > ", data);
                      // remove(index);
                      setEditCatPopOpen(dispatch, false)
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </Box>
          </StyledModal>
        )}
    </Card>
  );
}

export default Projects;
