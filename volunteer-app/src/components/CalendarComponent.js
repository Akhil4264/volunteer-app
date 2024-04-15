import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
// import { formatISO } from 'date-fns'; // For date formatting

const CalendarComponent = ({ events, onDateClick }) => {
  let mod_events = []
  useEffect(() => {
    mod_events = events.map((event)=>{
      // return {title : event.taskName,date : event.deadline.substring(0, 10)}
      return {title : event.taskName,date : event.deadline}
    })
    console.log(mod_events)

  },[events])
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
        <style>
        {`
          .fc .fc-toolbar-title {
            font-size: 1rem;
          }
          .fc .fc-button {
            font-size: 0.875rem;
            padding: 0.25rem 0.5rem;
          }
          .fc .fc-toolbar-chunk {
            display: flex;
            gap: 0.25rem;
          }
        `}
      </style>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        events={mod_events}
        eventColor="#10B981"
        // dateClick={(info) => onDateClick(formatISO(info.date))}
      />
    </div>
  );
};

export default CalendarComponent;
