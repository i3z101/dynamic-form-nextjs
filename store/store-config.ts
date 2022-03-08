import {
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
  import { createWrapper, HYDRATE } from 'next-redux-wrapper';
  import dynamicFormReducer from './reducers/dynamic-form-reducer';
  const rootReducer: any = combineReducers({
    dynamicForm: dynamicFormReducer
  });
  
  const reducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
    switch(action.type) {
        case HYDRATE:
            const nextState = {
                ...state,
                ...action.payload,
            };
            return nextState;
        default:
            return rootReducer(state, action);
    }
  };
  
  export const makeStore = () =>
    configureStore({
      reducer,
    });
  
  type Store = ReturnType<typeof makeStore>;
  
  export type AppDispatch = Store['dispatch'];
  export type RootState = ReturnType<Store['getState']>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  
  export const wrapper = createWrapper(makeStore);
  