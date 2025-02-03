import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useSearch } from "../context/SearchBarContext";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
// type Props = {}
interface Product {
  product_id: number;
  name: string;
  Unit: string;
  Price_Per_Unit: number;
  Action: () => void;
}

const Grocery_Table: React.FC = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [deleteproduct, setDeleteProduct] = useState<Product | null>(null);
  const { searchText } = useSearch();

  const [visible, setvisible] = useState(false);

  const fetchdata = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getallproducts");

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      const sorted = data.sort((a, b) => a.product_id - b.product_id);
      setProduct(sorted);
    } catch (err) {
      console.error(err, "error");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const handleActionClick = (rowData: Product) => {
    setDeleteProduct(rowData);
    setvisible(true);
    // alert(`Action clicked for product ID: ${rowData?.product_id}`);
  };

  const actionButtonTemplate = (rowData: Product) => {
    return (
      <Button
        label="Delete"
        icon="pi pi-trash"
        onClick={() => handleActionClick(rowData)}
        className="p-button-rounded p-button-danger p-button-text"
        tooltip="Delete"
        tooltipOptions={{ position: "top" }}
      />
    );
  };
  const hideDeleteDialog = () => {
    setvisible(false);
  };
  const handleDelete = async () => {
    console.log(deleteproduct, "delete");

    if (deleteproduct) {
      try {
        await fetch("http://127.0.0.1:5000/deleteproducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: deleteproduct?.product_id,
          }),
        }).then((res) => console.log(res, "response"));

        setProduct((prevProducts) =>
          prevProducts.filter((p) => p.product_id !== deleteproduct.product_id)
        );
        setvisible(false);
        setDeleteProduct(null);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  console.log(product, "products");
  const filteredData = searchText
    ? product.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : product;

  return (
    <div>
      <DataTable value={filteredData}>
        <Column field="product_id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="Price_PerUnit" header="Price PerUnit"></Column>
        <Column field="uom_name" header="Unit"></Column>
        <Column body={actionButtonTemplate} header="Action" />
      </DataTable>

      <Dialog
        visible={visible}
        style={{ width: "350px" }}
        header="Confirm Delete"
        modal
        footer={
          <>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={hideDeleteDialog}
              className="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={handleDelete}
              className="p-button-danger"
            />
          </>
        }
        onHide={hideDeleteDialog}
      >
        <p>
          Are you sure you want to delete <strong>{deleteproduct?.name}</strong>
          ?
        </p>
      </Dialog>
    </div>
  );
};
export default Grocery_Table;
