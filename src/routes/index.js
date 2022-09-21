import React from 'react';
import { Routes, Route } from 'react-router-dom';
import history from '../services/history';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DecksHome from '../pages/DecksHome';
import Deck from '../pages/Deck';
import Decks from '../pages/Decks';
import Card from '../pages/Card';
import Revise from '../pages/Revise';

import Page404 from '../pages/Page404';

export default function OurRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MyRoute isClosed location={history.location.pathname}>
            <DecksHome />
          </MyRoute>
        }
      />
      <Route
        path="/login/"
        element={
          <MyRoute isClosed={false} location={history.location.pathname}>
            <Login />
          </MyRoute>
        }
      />
      <Route
        path="/register/"
        element={
          <MyRoute isClosed={false}>
            <Register />
          </MyRoute>
        }
      />
      <Route
        path="/deck/:id/edit"
        element={
          <MyRoute isClosed location={history.location.pathname}>
            <Deck />
          </MyRoute>
        }
      />
      <Route
        path="/decks/"
        element={
          <MyRoute isClosed location={history.location.pathname}>
            <Decks />
          </MyRoute>
        }
      />
      <Route
        path="/card/"
        element={
          <MyRoute isClosed location={history.location.pathname}>
            <Card />
          </MyRoute>
        }
      />
      <Route
        path="/card/:id/:deck_id/edit"
        element={
          <MyRoute isClosed location={history.location.pathname}>
            <Card />
          </MyRoute>
        }
      />
      <Route
        path="/revise/:id"
        element={
          <MyRoute isClosed location={history.location.pathname}>
            <Revise />
          </MyRoute>
        }
      />
      <Route to="*" element={<Page404 />} />
    </Routes>
  );
}
