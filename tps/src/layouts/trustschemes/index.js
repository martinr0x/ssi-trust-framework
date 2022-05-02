/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * 
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useEffect, useState } from "react";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import MDTypography from "../../components/MDTypography";

import Divider from "@mui/material/Divider";
import MDButton from "../../components/MDButton";
import IconButton from "@mui/material/IconButton";
import { KeyboardArrowDown, PhotoCamera } from "@mui/icons-material";

const getPolicies = (setState) => {
  fetch("/v1/policies").then(res => res.json()).then(res => {
    setState(s => ({ ...s, policies: res.result }));

  });
};

function TrustSchemeInfo({ tem, id, desc }) {


  return (
    <>
      <MDBox mt={1}>
        <MDTypography variant="caption" color="text">
          {desc}
        </MDTypography>

      </MDBox>

      <Divider> </Divider>
   <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor={"transparent"}
        borderRadius="lg"
        p={0}
        mb={1}
        mt={0}
      >
        <MDBox width="100%" display="flex" flexDirection="column">

          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={2}
          >


          </MDBox>
          <MDBox mb={1} lineHeight={0} display="flex"
                 justifyContent="space-between"
                 flexDirection={{ xs: "column", sm: "row" }}>
            <MDTypography variant="caption" color="text">
              Trust Establishment Mechanism:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {tem}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0} display={"flex"}>
            <MDTypography variant="caption" color="text">
              Trust Scheme ID:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {id}
              </MDTypography>
            </MDTypography>
          </MDBox>

        </MDBox>
      </MDBox>

    </>
  );
}


function TrustScheme() {


  const [state, setState] = useState({ total: 0, label: [], datasets: [], avgEvalTime: 0, policies: [] });
  useEffect(() => {
    getPolicies(setState);
    fetch("/logs").then(res => res.json()).then(res => {
      let data = {};
      let total = res.length;
      let avgEvalTime = (res.reduce((a, d) => a + d[0].metrics.timer_rego_query_eval_ns, 0) / res.length).toFixed(0);

      res.forEach(e => {
        if (data[e[0].path] == null) {
          data[e[0].path] = [];
        }
        data[e[0].path].push({ x: new Date(e[0].timestamp), y: e[0].metrics.timer_rego_query_eval_ns / 10e6 });
      });
      data = (Object.entries(data).map(([key, val]) => ({ label: "Policy " + key, data: val })));
      let timestamps = res.map(d => new Date(d[0].timestamp));

      setState(s => ({ ...s, total: total, labels: timestamps, datasets: data, avgEvalTime: avgEvalTime }));


      console.log({ total: total, labels: timestamps, datasets: data });
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox py={3}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                color="dark"
                icon="lock"
                title="European Banking Federation Trust Scheme"
                description={<TrustSchemeInfo id={"000G0012V5ZV0TQC6MVWGATR7QX54R63FATH6FXPVYAFCKGB8BWWY5BFKR.trusted"}
                                              tem={"ABD"}
                                              desc={"Trust Scheme of 3500 associated Banks in EU and EFTA countries."}/>}

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                color="dark"
                icon="lock"
                title="European Union Trusted List"
                description={<TrustSchemeInfo id={"000G00773DAFT2QKJZJ1EHGB2V77QN0F7T17TXB2XK92R3W3JKTPEKZN90.trusted"}
                                              tem={"ABD"}
                                              desc={"Trust Scheme of service providers of all member states of the European Union and European " +
                                              "Economic Area which are deemed trusted in accordance with eIDAS regulations."}/>}

              />
            </MDBox>
          </Grid>
        </Grid>

      </MDBox>

    </DashboardLayout>
  );
}

export default TrustScheme;
