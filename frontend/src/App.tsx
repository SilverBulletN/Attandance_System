import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layout/default-layout";
import Info from "./pages/AttendeeList";
import Total from "./pages/TotalDelegates";
import routes from "./routes";
import { Suspense, useEffect, useState } from "react";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Info />} />
          <Route path="/total" element={<Total />} />
          {routes.map((route, index) => {
            const { path, component: Component } = route;
            return (
              <>
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense>
                      <Component />
                    </Suspense>
                  }
                />
              </>
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
