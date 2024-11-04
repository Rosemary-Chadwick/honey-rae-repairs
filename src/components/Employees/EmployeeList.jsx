import { useEffect, useState } from "react";
import { getStaffUsers } from "../../services/userService";
import { User } from "../../users/User";
import { Link } from "react-router-dom";

export const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    getStaffUsers().then((staffArray) => {
      setEmployee(staffArray);
    });
  }, []);

  return (
    <div className="employees">
      {employee.map((employeeObj) => {
        return (
          <Link to={`/employees/${employeeObj.id}`} key={employeeObj.id}>
            <User user={employeeObj} />;
          </Link>
        );
      })}
    </div>
  );
};
