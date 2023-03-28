import React, { useEffect } from "react";
import Datatable from "../../components/datatable/Datatable";
import NavBar from "../../components/layout/navbar/NavBar";
import SideBar from "../../components/layout/sideBar/SideBar";
import "./List.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/apiCalls";

function List({ listType }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log(products);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <Datatable listType={listType} data={products} />
      </div>
    </div>
  );
}

export default List;
