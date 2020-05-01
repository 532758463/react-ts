import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const App = () => {
    return (
        <div>
            <h1 className="title">Hello React + TS + Webpack</h1>
        </div>
    );
};
ReactDOM.render(<App />, document.getElementById('app'));
export default App;
