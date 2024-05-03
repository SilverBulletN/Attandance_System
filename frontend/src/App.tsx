import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layout/default-layout";
import Info from "./pages/Checkin";
import Total from "./pages/TotalDelegates";
import List from "./pages/AttandeeList";
import routes from "./routes";
import { Suspense } from "react";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Info />} />
        <Route path="/total" element={<Total />} />
        <Route path="/list" element={<List />} />
        {routes.map((route) => {
          const { path, component: Component } = route;
          return (
            <Route
              key={path} 
              path={path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
