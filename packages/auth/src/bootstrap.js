import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';
// Mount function to start up the app
const mount = (element, { onSignIn, onSignOut, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if(onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App onSignIn={onSignIn} onSignOut={onSignOut} history={history}/>,
        element
    );

    return {
        onParentNavigate({pathname: nextPathName}) {
            const {pathname} = history.location;

            if (pathname !== nextPathName) {
                history.push(nextPathName);
            }
        }
    }
}

// If we are in development and in isolation
// call mount immediately
if(process.env.NODE_ENV === 'development') {
    const rootElement = document.querySelector('#_auth-dev-root');

    if(rootElement) {
        mount(rootElement, { defaultHistory: createBrowserHistory()});
    }
}

// We are running through container
// and we should export the mount function
export {mount};

