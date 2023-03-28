import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../dataTableSource";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

function Datatable({ listType, data }) {
  const dispatch = useDispatch();

  const title = listType === "users" ? "Add New User" : "Add New Product";
  const linkNew = listType === "users" ? "/users/new" : "/products/new";
  // const linkView = listType === "users" ? "/users/ggh" : "/products/";

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      innerHeight: 30,
      width: 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
              className="productListImg"
              src={params.row.img}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div className="cellAction">
              <Link to="/users/ghh" style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link to={linkNew} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default Datatable;
