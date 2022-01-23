/* eslint-disable react/prop-types */
// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import MDButton from "components/MDButton";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/exCat1.png";
import Food from "assets/images/small-logos/food.png";
import Travel from "assets/images/small-logos/travel.png";
import Med from "assets/images/small-logos/med.png";
import Salary from "assets/images/small-logos/salary.png";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import {
  useMaterialUIController,
  setSelectedCatId,
  setSelectedCatName,
  setEditCatPopOpen
} from "context";


export default function data(categories) {
  const [controller, dispatch] = useMaterialUIController();
  console.log("DATA --> ", categories);
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDButton
        component="a"
        target="_blank"
        rel="noreferrer"
        variant="gradient"
        fullWidth
        onClick={() => {
          setSelectedCatId(dispatch, id)
          setSelectedCatName(dispatch, name)
          setEditCatPopOpen(dispatch, true)
        }}
        key={name}
      >
        <MDAvatar src={image} name={name} size="sm" />
        <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
          {name}
        </MDTypography>
      </MDButton>
    </MDBox>
  );

  return {
    columns: [
      { Header: "category", accessor: "category", width: "100%", align: "left" },
      // { Header: "companies", accessor: "companies", width: "45%", align: "left" },
      // { Header: "members", accessor: "members", width: "10%", align: "left" },
      // { Header: "budget", accessor: "budget", align: "center" },
      // { Header: "completion", accessor: "completion", align: "center" },
    ],

    rows:
      categories != null
        ? categories.map((e) => ({ category: <Company image={e.name == "Med" ? Med : e.name == "Travel" ? Travel : e.name == "Food" ? Food : Salary} name={e.name} id={e.id}/> }))
        : [],
    // rows: [
    //   {
    //     category: <Company image={logoXD} name="Material UI XD Version" />,
    //   },
    //   {
    //     category: <Company image={logoAtlassian} name="Add Progress Track" />,
    //   },
    //   {
    //     category: <Company image={logoSlack} name="Fix Platform Errors" />,
    //   },
    //   {
    //     category: <Company image={logoSpotify} name="Launch our Mobile App" />,
    //   },
    //   {
    //     category: <Company image={logoJira} name="Add the New Pricing Page" />,
    //   }
    // ],
  };
}
