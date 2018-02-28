import * as types from './../actions/actionTypes';
// import socketController from './../socket';

const initialState = {
  drawer: true,
  id: '',
  name: '',
  users: [],
  correctWord: '',
  messages: [],
  guessInput: '',
  context: null,
  canvas: {
    clickX: [],
    clickY: [],
    clickDrag: [],
  },
  
};

const mainReducer = (state=initialState, action) => {
  // console.log('From-reducer', action.type);
  switch(action.type) {
    case types.SET_ID:
      // const newState = Object.assign({}, state);
      // newState.id =
      return Object.assign({},
        state,
        {id: action.id}
      );

    case types.GET_USERS:
      const users = action.users;
      let drawer = false;
      let name = '';
      let correctWord = '';
      for (let user of users) {
        // console.log(user);
        if (user.id === state.id)  {
          drawer = user.drawer;
          name = user.name;
          correctWord = user.correctWord;
        }
      }
      // console.log('username', users);
      return Object.assign({},
        state,
        {users: users},
        {correctWord: correctWord},
        {drawer:drawer},
        {name: name}
      );

    case types.SEND_GUESS:
      const input = document.getElementsByTagName('input').input;
      input.value = '';
      return Object.assign({},
        state,
        {guessInput: ''}
      );

    case types.ADD_MESSAGE:
      const messages = JSON.parse(JSON.stringify(state.messages));
      // If the enteredd message is not empty add it to the list
      if(action.message_log.message) messages.unshift(action.message_log);
      // The list should contain at most 6 messages
      if (messages.length > 5) messages.pop();
      return Object.assign({},
        state,
        {messages: messages}
      );

    case types.ADD_CLICK:
      const canvas_click = JSON.parse(JSON.stringify(state.canvas));
      // console.log(action);
      canvas_click.clickX.push(action.x);
      canvas_click.clickY.push(action.y);
      canvas_click.clickDrag.push(action.dragging);
      return Object.assign({},
        state,
        {canvas: canvas_click}
      );

    case types.ADD_PIXS:
      const canvas = JSON.parse(JSON.stringify(state.canvas));
      // console.log(action);
      canvas.clickX = canvas.clickX.concat(action.clickX);
      canvas.clickY = canvas.clickY.concat(action.clickY);
      canvas.clickDrag = canvas.clickDrag.concat(action.clickDrag);
      return Object.assign({},
        state,
        {canvas: canvas}
      );

    case types.INIT_CONTEXT:
      if(state.context) return state;
      return Object.assign({},
        state,
        {context: action.newContext}
      );

    case types.RESET_CONTEXT:
    console.log(state);
      let tempS = Object.assign({}, state);
      if (action.strokeStyle) tempS.context.strokeStyle = action.strokeStyle;
      if (action.join) tempS.context.lineJoin = action.join;
      if (action.width) tempS.context.lineWidth = action.width;

      console.log(tempS);

      return tempS;

    case types.CLEAR_CANVAS:
      const newCanvas = {
        clickX: [],
        clickY: [],
        clickDrag: [],
      }
      return Object.assign({},
        state,
        {canvas: newCanvas}
      );

    case types.CLEAR:
      console.log('in reducer types.CLEAR')

     
      return Object.assign({},
        state,
        {eraser: eraser}
      );

    default:
      return state;
  }
};




export default mainReducer;
