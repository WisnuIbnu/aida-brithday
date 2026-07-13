Runtime TypeError



Failed to execute 'animate' on 'Element': Offsets must be monotonically non-decreasing.
components/sections/OurStory.tsx (88:5) @ PolaroidCard


  86 |
  87 |   return (
> 88 |     <motion.button
     |     ^
  89 |       layoutId={`story-polaroid-${chapter.id}`}
  90 |       type="button"
  91 |       onClick={() => onSelect(index)}
Call Stack
58

Show 52 ignore-listed frame(s)
button
<anonymous>
PolaroidCard
components/sections/OurStory.tsx (88:5)
<unknown>
components/sections/OurStory.tsx (172:15)
Array.map
<anonymous>
OurStory
components/sections/OurStory.tsx (171:24)
Home
app\page.tsx (22:7)