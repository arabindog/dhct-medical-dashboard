import {
  RECEIVE_API_DATA,
  DIPLAY_PAGE_VIEW
} from "../action/actions";

// export default function data (state = {}, { type, data }) => {
//   switch (type) {
//     case RECEIVE_API_DATA:
//       return data;
//     case DIPLAY_PAGE_VIEW:
//       return data;
//     default:
//       return state;
//   }
// };

function data(state = {}, { type, data }) {
  switch (type) {
    case RECEIVE_API_DATA:
      return data;
    case DIPLAY_PAGE_VIEW:
      return data;
    default:
      return state;
  }
}

export default data;
