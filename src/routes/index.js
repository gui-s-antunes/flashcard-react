import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DecksHome from '../pages/DecksHome';
import Deck from '../pages/Deck';
import Decks from '../pages/Decks';
import Card from '../pages/Card';
import Revise from '../pages/Revise';

import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="*" element={<Page404 />} /> */}
      <MyRoute exact path="/" component={DecksHome} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="/deck/" component={Deck} isClosed />
      <MyRoute exact path="/deck/:id/edit" component={Deck} isClosed />
      <MyRoute exact path="/decks/" component={Decks} isClosed />
      <MyRoute exact path="/card/" component={Card} isClosed />
      <MyRoute exact path="/card/:id/:deck_id/edit" component={Card} isClosed />
      <MyRoute exact path="/revise/:id" component={Revise} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
