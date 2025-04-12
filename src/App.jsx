// App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainSection";
import Home from "./pages/Home";
import GameDetailpage from "./pages/GameDetailpage";
import Library from "./components/Library";
import { ToastContainer } from "react-toastify";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/game/:id" element={<GameDetailpage />} />

          {/* 🔒 Protected Route */}
          <Route
            path="/library"
            element={
              <>
                <SignedIn>
                  <Library />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
