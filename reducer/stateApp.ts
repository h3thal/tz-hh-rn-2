import initState from './initState';

interface Image {
  urls: {
    small: string;
    full: string;
  };
}

interface IStateApp {
  per_page: number;
  images: Image[];
}

interface AddApiAction {
  type: 'addApi';
  payload: {images: Image[]};
}

interface ResetApiAction {
  type: 'resetApi';
  payload: {images: Image[]};
}

interface NextPageAction {
  type: 'nextPage';
}

type StateAppAction = AddApiAction | ResetApiAction | NextPageAction;

export const stateApp = (
  state: IStateApp = initState,
  action: StateAppAction,
): IStateApp => {
  switch (action.type) {
    case 'addApi':
      return {...state, images: [...state.images, ...action.payload.images]};
    case 'resetApi':
      return {...state, images: [...action.payload.images]};
    case 'nextPage':
      return {...state, per_page: state.per_page + 20};
    default:
      return state;
  }
};
