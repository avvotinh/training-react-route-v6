import React, { lazy } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { css } from "@emotion/css";
// import ProductsIndex from "../Products/ProductsIndex";
// import ProductEdit from "../Products/ProductEdit";
import Loadable from "../Common/Loadable";

const ProductEdit = Loadable(lazy(() => import("../Products/ProductEdit")));
const ProductsIndex = Loadable(lazy(() => import("../Products/ProductsIndex")));

const AdminStyles = css`
  .Admin {
    &-Header {
      display: flex;
      align-items: center;
    }
    &-New {
      text-decoration: none;
      border: 2px solid #fff;
      color: #fff;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 600;
      text-transform: uppercase;
      margin-left: auto;
    }
  }
`;

const Admin = () => {
  return (
    <div className={AdminStyles}>
      <div className="Admin-Header">
        <h1>Admin</h1>
        <Link to="new" className="Admin-New">
          New
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<ProductsIndex />} />
        <Route path="/new" element={<ProductEdit />} />
        <Route path="/:id" element={<ProductEdit isEdit />} />
      </Routes>
    </div>
  );
};

export default Admin;
