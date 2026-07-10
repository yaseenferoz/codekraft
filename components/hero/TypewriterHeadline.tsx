"use client";

import { useEffect, useMemo, useState } from "react";

const bootDelay = 2050;
const headline = "We don't just code_\nWe craft digital experiences.";
const accentWords = ["craft"];

export function TypewriterHeadline() {
  const [visible, setVisible] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setStarted(true), bootDelay);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!started) {
      return;
    }

    if (visible >= headline.length) {
      return;
    }

    const delay = headline[visible] === "\n" ? 120 : 34;
    const timeout = window.setTimeout(() => {
      setVisible((current) => Math.min(current + 1, headline.length));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [started, visible]);

  const characters = useMemo(
    () =>
      headline.slice(0, visible).split("").map((character, index) => ({
        character,
        highlight: accentWords.some((word) => {
          const start = headline.indexOf(word);
          return start >= 0 && index >= start && index < start + word.length;
        }),
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
