"use client";

import Head from "next/head";
import Main from "../components/Main";
import Menu from "../components/Menu";
import Sign from "@/components/Sign";
import { useState, useEffect } from "react";
import "styles/globals.css";
import { useRouter } from "next/router";
import EditableMenu from "@/components/EditableMenu";
import axios from "axios";

export default function Index() {
  const [fadeOut, setFadeOut] = useState(false);
  const [auth, setAuth] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(
    () =>
      axios
        .get("/api/auth")
        .then((res) => {
          res?.data === "done" && setAuth(true);
        })
        .then(() => setLoad(false)),
    [auth]
  );

  const handleFadeOut = () => {
    setTimeout(() => {
      setFadeOut(true);
    }, 2000);
  };

  useEffect(() => {
    handleFadeOut();
  }, []);

  // Write code below
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Moge Tee</title>
      </Head>
      <main>
        {router.pathname === "/cms" ? (
          auth ? (
            <EditableMenu />
          ) : (
            <Sign setAuth={setAuth} />
          )
        ) : fadeOut ? (
          <Menu />
        ) : (
          <Main fadeOut={!fadeOut} />
        )}
      </main>
    </>
  );
}
