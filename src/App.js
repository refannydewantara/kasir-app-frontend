import Home from "./pages/Home";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  return (
      <BrowserRouter>
          <NavigationBar />
          <main>
              <Switch>
                  <Route path="/" component={Home} exact/>
                  <Route path="/sukses" component={Success} exact/>
                  <Route path="*" component={NotFound}/>
              </Switch>
          </main>
      </BrowserRouter>
  );
};

export default App;
