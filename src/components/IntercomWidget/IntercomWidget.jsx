"use client";

import Intercom from "@intercom/messenger-js-sdk";
import { useEffect, useRef } from "react";

export default function IntercomWidget() {
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;

    Intercom({
      app_id: "iumsvmpa",
    });

    booted.current = true;

    return () => {
      Intercom("shutdown");
    };
  }, []);

  return null;
}
