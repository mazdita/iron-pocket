
import { Switch, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from "./components/header/Header";
import LinkDetails from './components/links/link-details/LinkDetails';
import LinkEditor from './components/links/link-editor/LinkEditor';
import LinksList from "./components/links/links-list/LinksList";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route exact path="/" component={LinksList} />
        <Route exact path="/:id" component={LinkDetails} />
        <Route exact path="/:id/edit" component={LinkEditor} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
