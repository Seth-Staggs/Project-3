import { ApolloProvider } from '@apollo/react-hooks';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';



ReactDOM.render( ApolloProvider, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
