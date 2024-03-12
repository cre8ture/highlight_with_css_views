

## source
https://codepen.io/jh3y/pen/qBgRLxb

https://ryanmulligan.dev/blog/scroll-triggered-animations-style-queries/

```I happened upon a CodePen by Jhey Tompkins that kicked off my curiosity. In that demo, as the page is scrolled, animations are triggered that smoothly highlight passages of text within the copy. It's all powered by CSS. That's incredible! I've achieved this effect in past demos using GSAP ScrollTrigger and the Intersection Observer API. How is this same concept accomplished with only CSS?

Diving into Jhey's code, we find a --highlighted custom property set to 0. Using scroll-driven animations, the value is updated to 1 as the mark element reaches the end of its animation-range. That value is passed into a calc() function that transitions a background-position property to create the highlighting effect.

This scroll-driven animation mimics intersection observer functionality. In fact, if we inspect the JS panel in the CodePen editor, we'll find that Jhey provides an intersection observer fallback for browsers that don't support CSS view progress timelines.```