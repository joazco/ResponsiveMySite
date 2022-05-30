type State = {
  loading: boolean;
  urlFound: boolean | null;
  showErrorNotFound: boolean;
};
type Action =
  | "fetchUrl"
  | "urlFind"
  | "urlNotFound"
  | "reset"
  | "closeColorPicker";

export const defaultState: State = {
  loading: false,
  urlFound: null,
  showErrorNotFound: false,
};

const createFormReducer = (state: State, action: Action): State => {
  switch (action) {
    case "fetchUrl":
      return { ...state, loading: true };
    case "urlFind":
      return {
        ...state,
        loading: false,
        urlFound: true,
        showErrorNotFound: false,
      };
    case "urlNotFound":
      return {
        ...state,
        loading: false,
        urlFound: null,
        showErrorNotFound: true,
      };
    case "reset":
      return defaultState;
    default:
      return state;
  }
};

export default createFormReducer;
