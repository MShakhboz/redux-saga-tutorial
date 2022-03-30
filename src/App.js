import { useSelector, useDispatch, connect } from 'react-redux'; 
import './App.css';
import store from './redux';

function App({ dispatchLoadData }) {
  const selector = useSelector(store => store);
  const dispatch = useDispatch();

  console.log(selector);
  return (
    <div className="App">
      <p>Redux Saga</p>
      <button onClick={dispatchLoadData}>click me</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoadData: () => dispatch({type: "LOAD_DATA"})
  }
}

export default connect(null, mapDispatchToProps)(App);

