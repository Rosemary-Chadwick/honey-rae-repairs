import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeesByUserId } from "../../services/employeeService";
import "./Employees.css";

export const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const { employeeId } = useParams();

  useEffect(() => {
    getEmployeesByUserId(employeeId).then((data) => {
      const employeeObj = data[0];
      setEmployee(employeeObj);
    });
  }, [employeeId]);

  if (!employee) return <div>Not an Employee...</div>;

  const ticketCount = employee.employeeTickets
    ? employee.employeeTickets.length
    : 0;

  return (
    <section className="employee">
      <header className="employee-header">{employee.user?.fullName}</header>
      <div>
        <span className="employee-info">Email : </span>
        {employee.user?.email}
      </div>
      <div>
        <span className="employee-info">Specialty : </span>
        {employee.specialty}
      </div>
      <div>
        <span className="employee-info">Rate : </span>
        {employee.rate}
        <footer>
          <div>
            <span className="employee-info">Tickets working on : </span>
            {ticketCount}
          </div>
        </footer>
      </div>
    </section>
  );
};
