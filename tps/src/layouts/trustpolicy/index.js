
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import trustDecisionTableData from "./data/trustPolicyTableData";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useEffect, useState } from "react";

const getPolicies = (setState) => {
  fetch("/v1/policies").then(res => res.json()).then(res => {
    setState(s => ({ ...s, policy: res.result[0].raw }));
  });
};
function TrustPolicy() {
  const { columns, rows } = trustDecisionTableData();

  const [state, setState] = useState({ } );


  useEffect(()=> {
    getPolicies(setState);

  }, []);
  const subRowComponent = (row) => {
    return (<Card>
      <MDBox sx={{ flexDirection: 'column' }} p={3}>

        <MDBox  sx={{width:"100%"}}>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
            Trust Policy
          </MDTypography>
        </MDBox>
        <MDBox   bgColor={"transparent"}
                 borderRadius="lg">
          <SyntaxHighlighter language="javascript"   customStyle={{  fontSize: "12px", }} codeTagProps={{ style: { lineHeight: "inherit", fontSize: "inherit",
            } }} style={coy}>
            {row.original.values.policy}
          </SyntaxHighlighter>
        </MDBox>




      </MDBox>

    </Card>);

  };

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Trust Policies
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={{ defaultValue: 5 }}
                  showTotalEntries={true}
                  noEndBorder
                  subRowComponent={subRowComponent}
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox   p={3} bgColor={"transparent"}
                       borderRadius="lg">
              <SyntaxHighlighter language="javascript"   customStyle={{  fontSize: "12px", }} codeTagProps={{ style: { lineHeight: "inherit", fontSize: "inherit",
                } }} style={coy}>
                {state.policy}

              </SyntaxHighlighter>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}

export default TrustPolicy;
