'use client'

import { Button } from "@/components/ui/button"

export default function ReduceButton() {
  function reduceFont() {
    const enlargeables: NodeList = document.querySelectorAll(".enlargeable");
    enlargeables.forEach((element) => {
      const el = element as HTMLElement;
      const currentFontSize = window.getComputedStyle(el).fontSize;
      const newFontSize = parseFloat(currentFontSize) - 5;
      el.style.fontSize = `${newFontSize}px`;
    });
  }

  return (
    <Button onClick={reduceFont}>Reduce font</Button>
  );
}