import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
// import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useAppContext } from "../context/fetchDataContext";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";
// type Props = {};
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
interface FormState {
  name: string;
  category: { uom_id: number; uom_name: string } | null;
  priceUnit: number | null;
}

interface add {
  uom: object[];
  productDialog: boolean;
  setproductDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddNewProduct = ({
  uom,
  productDialog,
  setproductDialog,
}: add) => {
  const toast = useRef<Toast>(null);
  useEffect(() => {
    console.log(uom, "test");
  }, [uom]);
  const [formData, setformData] = useState<FormState>({
    name: "",
    category: null,
    priceUnit: 0,
  });
  const { refreshApp } = useAppContext();
  const handleInputChange = (field: string, value: any) => {
    console.log(value, "value");

    setformData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const SaveProduct = async () => {
    console.log("====================================");
    console.log(formData, "form");
    console.log("====================================");
    if (formData) {
      try {
        const res = await fetch("http://127.0.0.1:5000/insertproducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok === true) {
          console.log(res, "response");
          setproductDialog(false);
          toast.current?.show({
            severity: "success",
            summary: "Success Message",
            detail: "Item Added Successfully!",
            life: 3000, // Duration in milliseconds
          });
        }
        setTimeout(() => {
          // Increment refreshKey to force re-render
          refreshApp();
        }, 3000);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div>
      {" "}
      <Toast ref={toast} />
      <Dialog
        visible={productDialog}
        header="Add New Product"
        style={{ width: "500px", height: "400px" }}
        onHide={() => setproductDialog(false)}
      >
        <div className="p-fluid">
          {/* Name Input */}
          <div className="p-field" style={{ marginBottom: "10px" }}>
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter name"
            />
          </div>

          {/* Category Select */}
          <div className="p-field" style={{ marginBottom: "10px" }}>
            <label htmlFor="category">Category</label>
            <Dropdown
              id="category"
              value={formData.category}
              options={uom}
              onChange={(e) => handleInputChange("category", e.value)}
              optionLabel="uom_name"
              placeholder="Select a category"
            />
          </div>

          {/* Price Unit */}
          <div className="p-field" style={{ marginBottom: "10px" }}>
            <label htmlFor="priceUnit">Price Unit</label>
            <InputNumber
              id="priceUnit"
              value={formData.priceUnit}
              onValueChange={(e) => handleInputChange("priceUnit", e.value)}
              placeholder="Enter price unit"
              mode="decimal"
              minFractionDigits={2}
            />
          </div>
          <Button
            label="Save"
            icon="pi pi-check"
            style={{ width: "150px", marginTop: "20px" }}
            className="p-button-success custom-save-button"
            onClick={() => SaveProduct()}
          />
        </div>
      </Dialog>
    </div>
  );
};

// export default addNewProduct;
