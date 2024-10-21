import { useEffect, useState } from "react";
import { getAllTickets } from "./services/ticketService.jsx";
import "./App.css";

export const App = () => {
  const [allTickets, setAllTickets] = useState([]);
  // a state variable that will act as a toggle for if we want to show if emergency or not
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  //variable to hold ticket array so you can sow all tickets again after .filtering the nonEmergency ones out
  const [filteredTickets, setFilteredTickets] = useState([]);

  //only runs on initial render
  useEffect(() => {
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray);
      console.log("Ticket's set!");
    });
  }, []);

  //useEffect(() => {}, [])
  // When the dependency array is empty, the useEffect is only watching for the initial render of this component.
  //hook takes 2 arguments -- (function(what we want to happen),
  //[an array called the dependency array(when we want it to happen)])
  //this below is what makes the buttons work... the if else does not give back the complete array when the show all button is pushed
  useEffect(() => {
    if (showEmergencyOnly) {
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

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <div>
        <button
          className="filter-btn btn-primary"
          onClick={() => {
            setShowEmergencyOnly(true);
          }}
        >
          Emergency
        </button>
        <button
          className="filter-btn btn-info"
          onClick={() => {
            setShowEmergencyOnly(false);
          }}
        >
          Show All
        </button>
      </div>
      <article className="tickets">
        {filteredTickets.map((ticket) => {
          //instead of allTickets.map
          return (
            <section className="ticket" key={ticket.id}>
              <header className="ticket-info">${ticket.id}</header>
              <div>{ticket.description}</div>
              <footer>
                <div>
                  <div className="ticket-info">emergency</div>
                  <div>{ticket.emergency ? "Yes" : "No"}</div>
                </div>
              </footer>
            </section>
          );
        })}
      </article>
    </div>
  );
};
//extra

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
