"use client";

import { useEffect, useMemo, useState } from "react";

const headline = "We don't just code_\nWe craft digital\nexperiences.";
const craftStart = headline.indexOf("craft");
const craftEnd = craftStart + "craft".length;

export function TypewriterHeadline() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= headline.length) {
      return;
    }

    const delay = headline[visible] === "\n" ? 90 : 24;
    const timeout = window.setTimeout(() => {
      setVisible((current) => Math.min(current + 2, headline.length));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [visible]);

  const characters = useMemo(
    () =>
      headline.slice(0, visible).split("").map((character, index) => ({
        character,
        highlight: index >= craftStart && index < craftEnd,
        key: `${character}-${index}`,
      })),
    [visible],
  );

  return (
    <h1 className="ck-hero-heading">
      <span className="ck-visually-hidden">We craft digital experiences</span>
      <span aria-hidden="true">
        {characters.map(({ character, highlight, key }) => {
          if (character === "\n") {
            return <br key={key} />;
          }

          return (
            <span
              key={key}
              className={highlight ? "ck-word-accent" : "ck-word-normal"}
            >
              {character}
            </span>
          );
        })}
        <span className="ck-type-cursor" aria-hidden="true" />
      </span>
    </h1>
  );
}
