import { useEffect, useState } from "react";
import "./App.css";
import DataTable from "./components/Table";

function App() {
  const [customerData, setCustomersData] = useState<Array<Customer>>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await fetch(
      "https://backend-task-gcpc.onrender.com/api/v1/customer-records"
    );
    const data = await response.json();
    setCustomersData(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
          <h1 className="text-3xl font-light">Loading data.......</h1>
          <h1 className="text-xl font-light">
            Please wait fetching data from the server
          </h1>
          <div className="spinner-box">
            <div className="circle-border">
              <div className="circle-core"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-[98vw] font-urban flex justify-center pt-6">
          <div className="w-[80vw]">
            <DataTable data={customerData} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

export interface Customer {
  sno: number;
  customer_name: string;
  age: number;
  created_at: string;
  location: string;
  phone: string;
}
