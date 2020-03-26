import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Paginas feitas.
import Home from './Pages/Home';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </BrowserRouter>
    );
}