import React, { Component } from 'react';
import '../App.css';
import { Layout } from 'antd';
import RootMenu from '../Layout/RootMenu'
import NotesList from '../Note/NotesList'
import Note from '../Note/Note'

const rootMenuItems = [
  { id: 1, title: "General", icon: "apple" },
  { id: 2, title: "Trash", icon: "delete" }
]

const tags = ["#Learning", "#React", "#Elixir", "#Win"]

const notes = [
  {id: 1, title: "This is my first note", body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  Donec hendrerit tempor tellus.  Donec pretium posuere tellus.  Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.  Nulla posuere.  Donec vitae dolor.  Nullam tristique diam non turpis.  Cras placerat accumsan nulla.  Nullam rutrum.  Nam vestibulum accumsan nisl."},
  { id: 2, title: "Lorem", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam."}
]

class App extends Component {
  render() {
    return (
      <Layout>
        <RootMenu items={rootMenuItems} tags={tags} />
        <NotesList notes={notes} />

        <Layout style={{ marginLeft: 320 }}>
          <Note />
        </Layout>
      </Layout>
    );
  }
}

export default App;
