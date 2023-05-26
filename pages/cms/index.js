import EditableMenu from "@/components/EditableMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import Sign from "@/components/Sign";
import Main from "@/components/Main";

export default function Index() {
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

  return <>{auth ? <EditableMenu /> : <Sign setAuth={setAuth} />}</>;
}
