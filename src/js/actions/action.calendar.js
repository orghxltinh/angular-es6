export const CALENDAR_LOAD_SUCCESS = "CALENDAR_LOAD_SUCCESS";
export const CALENDAR_LOAD_ERROR = "CALENDAR_LOAD_ERROR";


function getData(events) {
  console.log("data:",events);
  return {
    type: CALENDAR_LOAD_SUCCESS,
    events
  }
}

export function fetchData() {
  return dispatch => {
    $.ajax({
      url: "localhost:3000/tasks",
      dataType: "JSON",
      type: "GET",
      success: res => {
        return dispatch(getData(res))
      },
      error: err => {
        return dispatch({
          type: CALENDAR_LOAD_ERROR
        })
      }
    })
    //ajax here
  }
}
