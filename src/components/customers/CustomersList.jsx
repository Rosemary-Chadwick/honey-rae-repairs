import { useEffect, useState } from "react";
import { User } from "../../users/User";
import { getNonStaffUsers } from "../../services/userService";
import "./Customers.css";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getNonStaffUsers().then((customerArray) => {
      setCustomers(customerArray);
    });
  }, []);

  return (
    <div className="customers">
      <div>
        <h2>Customers</h2>
      </div>
      {customers.map((customerObj) => {
        return <User user={customerObj} key={customerObj.id} />;
      })}
    </div>
  );
};
