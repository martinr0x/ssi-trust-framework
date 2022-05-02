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
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";




// Dashboard components
import { useEffect, useState } from "react";

const getPolicies = (setState) => {
  fetch("/v1/policies").then(res => res.json()).then(res => {
    setState(s => ({ ...s, policies: res.result }));

  });
};


function Dashboard() {


  const [state, setState] = useState({ total: 0, label: [], datasets: [], avgEvalTime: 0 , policies:[]});
  useEffect(() => {
    getPolicies(setState);
    fetch("/logs").then(res => res.json()).then(res => {
      let data = {};
      let total = res.length;
      let avgEvalTime = (res.reduce((a, d) => a+d[0].metrics.timer_rego_query_eval_ns, 0) / res.length).toFixed(0);

      res.forEach(e => {
        if (data[e[0].path] == null) {
          data[e[0].path] = [];
        }
        data[e[0].path].push({ x: new Date(e[0].timestamp), y: e[0].metrics.timer_rego_query_eval_ns/10e6 });
      });
      data = (Object.entries(data).map(([key, val]) => ({ label: "Policy " + key, data: val })));
      let timestamps = res.map(d => new Date(d[0].timestamp));

      setState(s=>({ ...s, total: total, labels: timestamps, datasets: data, avgEvalTime: avgEvalTime }));


      console.log({ total: total, labels: timestamps, datasets: data });
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="policy"
                title="Trust Policies"
                count={state.policies.length}

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Trust Evaluation Requests"
                count={state.total}

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="timer"
                title="Avg. Evaluation Time"
                count={(state.avgEvalTime/10e6) + "ms"}

              />
            </MDBox>
          </Grid>

        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Trust Policy Evaluation Time"

                  date="updated 1 min ago"
                  chart={{
                    labels: state.labels,
                    datasets: state.datasets,
                  }}
                />
              </MDBox>
            </Grid>

          </Grid>
        </MDBox>

      </MDBox>

    </DashboardLayout>
  );
}

export default Dashboard;
