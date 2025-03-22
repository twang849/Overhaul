'use client'

import { Button } from "@/components/ui/button"

export default function EnlargeButton() {
  function enlargeFont() {
    const enlargeables: NodeList = document.querySelectorAll(".enlargeable");
    enlargeables.forEach((element) => {
      const el = element as HTMLElement;
      const currentFontSize = window.getComputedStyle(el).fontSize;
      const newFontSize = parseFloat(currentFontSize) + 10;
      el.style.fontSize = `${newFontSize}px`;
    });
  }

  return (
    <Button onClick={enlargeFont}>Enlarge font</Button>
  );
}