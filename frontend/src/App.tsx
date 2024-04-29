import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layout/default-layout";
// import Login from "./pages/Login";
import Info from "./pages/AttendeeList";
// import Page from "./pages/page"
import routes from "./routes";
import { Suspense, useEffect, useState } from "react";
import { Loader } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });
  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Info />} />
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
