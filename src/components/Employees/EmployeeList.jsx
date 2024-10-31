import { useEffect, useState } from "react";
import { getStaffUsers } from "../../services/userService";
import { User } from "../../users/User";

export const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    getStaffUsers().then((staffArray) => {
      setEmployee(staffArray);
    });
  }, []);

  return (
    <div>
      <div>
        <h2>Employees</h2>
      </div>
      {employee.map((employeeObj) => {
        return <User user={employeeObj} key={employeeObj.id} />;
      })}
    </div>
  );
};
