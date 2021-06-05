import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      const comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      console.log(comment);
      let foo = state.concat(comment);
      console.log(foo);
      return foo;
    default:
      return state;
  }
};