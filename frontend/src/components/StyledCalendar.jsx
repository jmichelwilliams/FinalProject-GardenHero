import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Component that renders a styled Calendar, used in the planner page.
const StyledCalendar = styled(Calendar)`
  font-size: 14px;
  background-color: #fefae0;
  border: none;
  width: 270px;

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #bc6c25;
  }
  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    height: 22px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 10px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #bc6c25;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
    color: #606c38;
    font-weight: bold;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    color: #606c38;
  }
  .react-calendar__navigation__label {
    color: #606c38;
  }
  .react-calendar__tile--active {
    background: #bc6c25;
    color: white;
  }

  .react-calendar__tile:disabled {
    background-color: #d8d8d8;
  }
`;

export default StyledCalendar;
