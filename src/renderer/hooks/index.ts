import { useRef, useEffect } from "react";

export const useScrollIntoView = (selected: boolean) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      // if the item becomes selected, scroll to it
      if (selected) {
        ref.current?.scrollIntoView({
          block: "nearest",
        });
      }
    }, [selected]);
  
    return ref;
  };