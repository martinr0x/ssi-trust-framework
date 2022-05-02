
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import trustDecisionTableData from "./data/trustDecisionTableData";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {coy} from "react-syntax-highlighter/dist/esm/styles/prism";



function Logs() {
  const { columns, rows } = trustDecisionTableData();


  const subRowComponent = (row) => {
    return (<Card>
      <MDBox sx={{ flexDirection: "column" }} p={5}>
        <MDBox sx={{ width: "100%" }}>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
            Transaction Data
          </MDTypography>
        </MDBox>
        <SyntaxHighlighter language="javascript"   customStyle={{  fontSize: "12px", }} codeTagProps={{ style: { lineHeight: "inherit", fontSize: "inherit", }, }} style={coy}>
          {JSON.stringify(row.original.values.input, null, 2)}
        </SyntaxHighlighter>


      </MDBox>

    </Card>);

  };

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
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
                  Trust Decision Logs
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

        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}

export default Logs;
