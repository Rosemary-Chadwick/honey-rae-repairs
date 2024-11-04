import { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/employeeService";
import "./Tickets.css";

export const Ticket = ({ ticket, currentUser }) => {
  const [employees, setEmployees] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState({});

  useEffect(() => {
    getAllEmployees().then((employeesArray) => {
      setEmployees(employeesArray);
    });
  }, []);

  // ? instead of wrapping it in an if statement that checks if tickets.employeeTickets.length is === 0
  useEffect(() => {
    if (employees.length && ticket?.employeeTickets?.length) {
      const foundEmployee = employees.find(
        (employee) => employee.id === ticket.employeeTickets[0]?.employeeId
      );
      setAssignedEmployee(foundEmployee || null);
    }
  }, [employees, ticket?.employeeTickets]);

  return (
    <section className="ticket">
      <header className="ticket-info">{ticket.id}</header>
      <div>{ticket.description}</div>
      <footer>
        <div>
          <div className="ticket-info">assignee</div>
          <div>
            {assignedEmployee ? assignedEmployee.user?.fullName : "None"}
          </div>
        </div>
        <div>
          <div className="ticket-info">emergency</div>
          <div>{ticket.emergency ? "Yes" : "No"}</div>
        </div>
        <div className="btn-container"></div>
      </footer>
    </section>
  );
};

// optional chaining operator ? stops it. if a ticket doesn't have an assigned employee there will be no employeeTicket array. index 0 on an empty array comes back undefined, ? would stop it right there and not check for an employeeId
//<div>{assignedEmployee ? assignedEmployee.user.fullName : "None"}</div> ---
// if assignedEmployee exists (?) then move on to grab their details. if assignedE comes back undefined return None
// if this exists -- (?) huh?  then render this info (:) otherwise do this (none)
//(?) goes before the dot. only use if you expect it to be undefined... not just because it's coming back undefined.... inspect first
