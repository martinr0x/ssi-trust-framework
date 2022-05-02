// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";

export default function data() {
  const [state, setState] = useState([]);
  useEffect(() => {


    fetch("/logs").then(res => res.json()).then(res => {
      setState(res);
    });
  }, []);
  const Policy = ({ name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>

      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{id}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      //todo percent from average
      { Header: "Trust Policy", accessor: "policy", width: "45%", align: "left" },
      { Header: "Verdict", accessor: "verdict", align: "left" },

      { Header: "timestamp", accessor: "timestamp", align: "center" },
      {
        Header: "action", accessor: "action", align: "center", Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Expand
        </MDTypography></span>),
      },
    ],
    rows: state.map(s => ({
      values: s[0],
      policy: (<Policy name={s[0].path} id={s[0].decision_id}/>),
      verdict: (s[0].result === true ? (
        <MDBox ml={-1}>
          <MDBadge badgeContent="trusted" color="success" variant="gradient" size="sm"/>
        </MDBox>
      ) : (
        <MDBox ml={-1}>
          <MDBadge badgeContent="untrusted" color="error" variant="gradient" size="sm"/>
        </MDBox>
      )),
      timestamp: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {new Date(s[0].timestamp).toUTCString()}
        </MDTypography>
      ),

    })),

  };
}
