import "./Single.scss";
import NavBar from "../../components/layout/navbar/NavBar";
import SideBar from "../../components/layout/sideBar/SideBar";
import Chart from "../../components/Chart/Chart";
import BaseTable from "../../components/table/Table";

function SinglePage() {
  return (
    <div className="single">
      <SideBar />
      <div className="singleContainer">
        <NavBar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue">+1 905 782 1429</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Address: </span>
                  <span className="itemValue">
                    282, Bankside Dr, Kitchener, ON
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Country: </span>
                  <span className="itemValue">Canada</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 months )" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <BaseTable />
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
