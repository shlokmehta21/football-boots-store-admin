import React, { useEffect, useState, useMemo } from "react";
import Chart from "../../components/Chart/Chart";
import NavBar from "../../components/layout/navbar/NavBar";
import SideBar from "../../components/layout/sideBar/SideBar";
import BaseTable from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import "./Home.scss";
import { userRequest } from "../../requestMethods";
import axios from "axios";

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
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      }
    };

    const getUserStats = async () => {
      try {
        const TOKEN = sessionStorage.getItem("TOKEN");

        const headers = {
          "Content-Type": "application/json",
        };

        if (TOKEN) {
          console.log(TOKEN);
          headers["token"] = `Bearer ${TOKEN}`;
        }

        const response = await axios.get(
          `https://football-boots-store-api.vercel.app/api/users/userstats`,
          {
            headers,
          }
        );

        console.log(response, "response");

        const updatedUserStats = response.data.map((item) => ({
          name: MONTHS[item._id - 1],
          "Active User": item.total,
        }));

        setUserStats((prev) => [...prev, ...updatedUserStats]);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
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
          <Chart
            aspect={3 / 1}
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
