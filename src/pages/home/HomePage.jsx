import React, { useEffect, useState, useMemo } from "react";
import Chart from "../../components/Chart/Chart";
import FeatureChart from "../../components/featureChart/FeatureChart";
import NavBar from "../../components/layout/navbar/NavBar";
import SideBar from "../../components/layout/sideBar/SideBar";
import BaseTable from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import "./Home.scss";
import { userRequest } from "../../requestMethods";

function HomePage() {
  const [orders, setOrders] = useState([]);
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await userRequest.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserStats = async () => {
      try {
        const response = await userRequest.get("/users/userstats");
        response.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };

    getUserStats();
    getOrders();
  }, [MONTHS]);

  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earnings" />
          <Widget type="balance" />
        </div>

        <div className="charts">
          <FeatureChart />
          <Chart
            aspect={2 / 1}
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
        </div>

        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <BaseTable data={orders} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
