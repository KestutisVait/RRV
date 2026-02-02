'use client';

import { useState } from "react";
// import Intro from "@/app/intro/intro";
import Main from "./main";

export default function PageClient() {
  // const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* {!introDone && <Intro onFinish={() => setIntroDone(true)} />}

      {introDone && <Main />} */}
      <Main />
    </>
  );
}
