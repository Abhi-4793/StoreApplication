// import React from "react";
import "../Stylesheet/Header.css";
import { IoBagAdd } from "react-icons/io5";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { AddNewProduct } from "./AddNewProduct";
// import { Button } from "primereact/button";
// import { AddNewProduct } from "./addNewProduct";

export const Header: React.FC = () => {
  const [productDialog, setproductDialog] = useState(false);
  const [Uom, setUom] = useState([]);
  // const [searchtext, setsearchtext] = useState("");
  useEffect(() => {
    const fetchUom = async () => {
      await fetch("http://127.0.0.1:5000/getUOM")
        .then((res) => res.json())
        .then((data) => {
          console.log("====================================");
          console.log(data, "dat");
          console.log("====================================");
          setUom(data);
        })
        .catch((err) => console.error(err, "error"));
    };
    fetchUom();
    console.log("====================================");
    console.log("uom", Uom);
    console.log("====================================");
  }, []);
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <h1>GroceryStore</h1>
        </div>

        <div className="header__search">
          <SearchBar />
        </div>
        <nav className="header__nav">
          {/* <ul>
            <li>
              <a href="/cart">
                <FaShoppingCart /> Cart
              </a>
            </li>
            <li>
              <a href="/account">
                <FaUserAlt /> Account
              </a>
            </li>
          </ul> */}
          <button
            className="add_product"
            onClick={() => {
              setproductDialog(true);
            }}
          >
            <i>
              <IoBagAdd color="#fff" size={"20px"} />
            </i>{" "}
            Add New Product
          </button>
        </nav>
      </header>
      <AddNewProduct
        uom={Uom}
        productDialog={productDialog}
        setproductDialog={setproductDialog}
      />
    </div>
  );
};
