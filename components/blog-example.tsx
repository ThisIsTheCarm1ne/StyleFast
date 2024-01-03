/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/MOMy0o7TPOX
 */

"use client"

import { useGlobalContext } from "@/context/store";

export default function blogExample() {

  const {fonts} = useGlobalContext();

  return (
    <div className="prose prose-lg mx-auto p-8 mt-20">
      <h1
        className="text-5xl font-bold tracking-tight text-center lg:text-5xl lg:leading-[3.5rem]"
        style={{fontFamily: fonts.header}}
      >
        This is a blog post template
      </h1>
      <p className="text-center mt-3">Posted on January 3, 2024</p>
      <p className="mt-3 text-lg leading-8 text-center">
        It's just for showcase. I'll put here some AI generated text, enjoy!
      </p>
      <div className="px-80">
        <h2
          className="mt-12 text-3xl font-semibold tracking-tight"
          style={{fontFamily: fonts.header}}
        >
          Colors in web design
        </h2>
        <p className="mt-4 text-lg leading-8">
          Unveiling the Palette: Exploring the Impact of Colors in Web Design.
          From Vibrant Hues to Subtle Tones, Crafting Digital Experiences Through Color Psychology.
          A Kaleidoscope of Possibilities: Harnessing the Power of Colors for Visually Stunning and Effective Website Interfaces.
        </p>
        <h2
          className="mt-12 text-3xl font-semibold tracking-tight"
          style={{fontFamily: fonts.header}}
        >
          Typography in web design
        </h2>
        <p className="mt-4 text-lg leading-8">
          Diving into the Art of Letters: Typography in Web Design.
          Beyond Words: Crafting Engaging Digital Experiences through Font Styles, Sizes, and Hierarchies.
          The ABCs of Aesthetics: Navigating the Impact of Typography on User Experience in the Online Realm.
          Shaping the Narrative: The Power of Fonts in Conveying Brand Identity and Emotion on the Web.
        </p>
      </div>
    </div>
  )
}
