import { CALENDAR_LOAD_SUCCESS, CALENDAR_LOAD_ERROR } from "../actions/action.calendar"

const initData = {
  events: []
}

const calendar = ( state = initData, action ) => {
  console.log( "action:",action);
  switch (action.type){
    case CALENDAR_LOAD_SUCCESS:
      return Object.assign({},state,{
        events: action.events
      })

      default:
      return state;
  }
}

export default calendar
