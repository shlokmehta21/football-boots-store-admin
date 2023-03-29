import "./FeatureChart.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

function FeatureChart() {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState();

  useEffect(() => {
    const getIncome = async () => {
      try {
        const response = await userRequest.get("/orders/income");
        console.log(response);
        setIncome(response.data);
        setPercentage(
          (response.data[1].total * 100) / response.data[0].total - 100
        );
      } catch (error) {
        console.log(error);
      }
    };

    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h3 className="title">Total Revenue</h3>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          {income.length !== 1 ? (
            <CircularProgressbar
              value={percentage}
              text={`${String(percentage).split(".")[0]}%`}
              strokeWidth={5}
            />
          ) : (
            ""
          )}
        </div>
        <p className="title">Total Sales Made Today</p>
        <p className="amount">${income[1]?.total}</p>
        <p className="desc">
          Previous transaction processing. Last payment may not be included
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>

          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>

          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureChart;
