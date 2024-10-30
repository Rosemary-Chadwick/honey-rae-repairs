import { useEffect, useState } from "react";
import { getAllTickets } from "../../services/ticketService";
import "./Tickets.css";
import { Ticket } from "./Ticket";
import { TicketFilterBar } from "./TicketFilterBar";

export const TicketList = () => {
  const [allTickets, setAllTickets] = useState([]);
  // a state variable that will act as a toggle for if we want to show if emergency or not
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  //variable to hold ticket array so you can show all tickets again after .filtering the nonEmergency ones out
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray);
      console.log("Ticket's set!");
    });
  }, []);

  //below is what makes the buttons work... if else does not give back the complete array when the show all button is pushed
  useEffect(() => {
    if (showEmergencyOnly === true) {
      const emergencyTickets = allTickets.filter(
        (ticket) => ticket.emergency === true
      );
      // instead of setAllTickets(emergencyTickets) because of the .filtering out nonEmergency tickets
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly, allTickets]);
  //https://www.youtube.com/watch?v=hoaH8RQjQBo at 24:00 shows how to fix undefined list of tickets

  useEffect(() => {
    const foundTickets = allTickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(foundTickets);
  }, [searchTerm, allTickets]);

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <TicketFilterBar
        setShowEmergencyOnly={setShowEmergencyOnly}
        setSearchTerm={setSearchTerm}
      />

      <article className="tickets">
        {filteredTickets.map((ticket) => {
          //instead of allTickets.map
          //the info here went to Ticket.jsx = <Ticket
          return <Ticket ticket={ticket} key={ticket.id} />;
        })}
      </article>
    </div>
  );
};

// export const App = () => {
//   let [count, setCount] = useState(0) // [stateVariable, setterFunction]
//   //whenever you use useState() use const... here we used let to see what happens

//   const handleBtnClk = () => {
//     setCount(count + 1)
//     console.log("clicked")
//   }

//   return (
//     <>
//       <h1>Hello!</h1>
//       <div>Welcome to your first React Application!</div>
//       <button className="btn-secondary" onClick={handleBtnClk}>Click Me!</button>
//       <div>Count: {count}</div>
//     </>
//   )
// }
