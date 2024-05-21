import FullCalendar from '@fullcalendar/react'
// import Calendar from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export default function CuteCalendar() {
  return (
    <FullCalendar
      plugins = {[ dayGridPlugin, timeGridPlugin, listPlugin ]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView="dayGridMonth"
      selectable={true}
    />
  )
}