import "./App.css";
import { CustomerList } from "./components/customers/CustomersList.jsx";
import { TicketList } from "./components/tickets/TicketList.jsx";
import { User } from "./users/User.jsx";

export const App = () => {
  return (
    <>
      <TicketList />
      <CustomerList />
      <User />
    </>
  );
};

//
