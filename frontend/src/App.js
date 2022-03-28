import "./App.css";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Edit from './components/Edit/Edit';
import Details from './components/Details/Details';
import { Switch, Route, Router } from "react-router-dom";



function App() {
  return (
    <>
      <Switch>
        <div className="app-container">
          <Header />
          <Route exact path="/" component={Form} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/view/:id" component={Details} />
          <Footer />
        </div>
      </Switch>
      {/* <Router>
        <Header />
        <main style={{ minHeight: "93vh" }}>
          <Switch>
            <Route exact path="/" component={Form} />
            <Route exact path="/edit/:id" component={Edit} />
            <Route exact path="/view/:id" component={Details} />
          </Switch>
          <Form />
          <Table />
        </main>
        <Footer />
      </Router> */}
    </>
  )
}

export default App;
