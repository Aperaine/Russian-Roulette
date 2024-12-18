/*
This game has been optimized enough to be played on a sprig. Try it!

WARNING: DO NOT RECREATE THIS
turn on sound

@title: Russian Roulette
@author: Aperaine
@tags: [Multiplayer]
@addedOn: 2024-00-00
*/

const a = "a"
const b = "b"
const B = "B"
const c = "c"
const C = "C"
const d = "d"
const e = "e"
const f = "f"
const g = "g"
const h = "h"
const floor = "F"
const blood = "x"

const blank = tune`
100: A4^100 + A5~100 + G5~100 + F5~100 + E5~100,
100: A4^100 + G4^100 + A5~100 + G5~100 + F5~100,
3000`
const liveRound = tune`
60: B5/60 + A5/60 + G5/60 + F5/60 + E5/60,
60: F5/60 + D5/60 + A4/60 + F4/60 + E4/60,
60: E5/60 + D5/60 + C5/60 + B4/60 + A4/60,
1740`

let shotsRemaining = 6
let live = 0
let starting = true
let dead = false

setLegend(
  [ a, bitmap`
................
...............0
...............0
...............0
................
................
................
................
................
................
................
................
............0000
...........00FFF
..........00CCFF
.........00CCCCF`],
  [ b, bitmap`
................
000.............
LL00..0000000000
0LL0000111111111
00LLLL1110000000
.0LLL11110111111
.00LL11110LLLLLL
..00111111111111
...0111111LLLLLL
...0111111111111
..00111110LLLLLL
.00L111110111111
00LL111110000000
CCCC111111111111
FCCC111111111111
FFCC111111111111`],
  [ B, bitmap`
................
000.............
LL00..0000000000
0LL0000111111111
00LLLL1110000000
.0LLL11110LLLLLL
.00LL11110111111
..00111111LLLLLL
...0111111111111
...0111111LLLLLL
..00111110111111
.00L111110LLLLLL
00LL111110000000
CCCC111111111111
FCCC111111111111
FFCC111111111111`],
  [ c, bitmap`
................
................
00000000........
1111111000000000
0001111LLLLLLLLL
1101111111111111
LL01111111111111
1111111LLLLLLLLL
LL11111111111111
1111111000000000
LL011100........
1101110.........
0001100.........
111110..........
111100..........
11100...........`],
  [ C, bitmap`
................
................
00000000........
1111111000000000
0001111LLLLLLLLL
LL01111111111111
1101111111111111
LL11111LLLLLLLLL
1111111111111111
LL11111000000000
11011100........
LL01110.........
0001100.........
111110..........
111100..........
11100...........`],
  [ d, bitmap`
................
................
................
0000000000000000
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
LLLLLLLLLLLLL000
11111111111110..
00000000000000..
................
................
................
................
................
................`],
  [ e, bitmap`
......0000......
......0LL00.....
......0LLL00....
0000000LLLL000..
LLLLLLLLLLLLL0..
11111111111110..
11111111111110..
00000000000000..
................
................
................
................
................
................
................
................`],
  [ f, bitmap`
........00FCCCCC
.......00FFFCCCC
.......0CCFFFCCC
......00CCCFFFCC
......0CCCCCFFFC
.....00FCCCCCFFF
.....0FFFCCCCCF0
....00CFFFCCCCC0
....0CCCFFFCCCC0
...00CCCCFFFCCC0
...0CCCCCCFFFCC0
..00FCCCCCCFFFC0
..0FFFCCCCCCFFF0
.00CFFFCCCCCCFF0
.0CCCFFFCCCCCCF0
.000000000000000`],
  [ g, bitmap`
FFFC111111111110
CFFF111110000100
CCFF111010..010.
CC000110100.010.
C00.00100.00010.
00...0110001110.
0....0011111000.
......0000000...
................
................
................
................
................
................
................
................`],
  [ h, bitmap`
0000............
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [ floor, bitmap`
FFFFFHHHHHHHHHH9
FFFFFHHHHHHHHH9H
FFFFFHHHHHHHH9HH
FFFFFHHFFFFH9HHH
HFFFFHFFFFFFHHHH
HFFFFHFFHHFFFHHH
HFFFFHFHHHHFFFHH
HFFFFHFHHFHFFFHH
HHFFFHFHHFHFFFFH
HHFFFHHHHFHFFFFH
HHHFFFHHFFHFFFFH
HHHHFFFFFFHFFFFH
HHH9HFFFFHHFFFFF
HH9HHHHHHHHFFFFF
H9HHHHHHHHHFFFFF
9HHHHHHHHHHFFFFF`],
  [ blood, bitmap`
33333333333333CC
3333333333333333
3333333333333333
33333CCCC3333333
3CC3CC33C3333333
CCCCC333CC333333
333333333C33333C
333333333CC333CC
3333333333C333C3
33333333CCCC3CC3
3333333CC33CCC33
3333333C33333333
333333CC33333333
33333CC333333333
3CCCCC3333333333
CC33333333333333`]
)

let level = 0
const levels = [
  map`
.....
abcde
fgh..
.....`,
  map`
.....
aBCde
fgh..
.....`,
]

function boot(){
  dead = false
  starting = true
  level = 0

  shotsRemaining = 6
  
  setMap(levels[level])
  setBackground(floor)

  clearText()
  
  addText("Use W and S to\nadjust amount of\nshots", {
    x: 0,
    y:0,
    color: color`2`})
  addText("Press D\nto shoot\n\nRemaining: " + shotsRemaining, {
    x: 6,
    y:11,
    color: color`2`})
}

boot()

onInput("w", () => {
  if (starting && shotsRemaining < 10){
    shotsRemaining += 1
    clearText()
    addText("Use W and S to\nadjust amount of\nshots", {
    x: 0,
    y:0,
    color: color`2`})
    addText("Press D\nto shoot\n\nRemaining: " + shotsRemaining, {
    x: 6,
    y:11,
    color: color`2`})
  }
})

onInput("s", () => {
  if (starting && shotsRemaining > 2){
    shotsRemaining -= 1
    clearText()
    addText("Use W and S to\nadjust amount of\nshots", {
    x: 0,
    y:0,
    color: color`2`})
    addText("Press D\nto shoot\n\nRemaining: " + shotsRemaining, {
    x: 6,
    y:11,
    color: color`2`})
  }
})

onInput("d", () => {
  if (!dead){  
    if (starting){
      starting = false
      live = getRandomInt(1, shotsRemaining)
    }

    if (live == shotsRemaining){
      playTune(liveRound)
      dead = true
      clearText()
      addText("Live!", {
    x: 7,
    y:0,
    color: color`2`})
      addText("Press D\nto restart\n\nRemaining: " + shotsRemaining, {
    x: 6,
    y:11,
    color: color`2`})
      setBackground(blood)
    } else{
      playTune(blank)
      shotsRemaining -= 1
      clearText()
      addText("Blank!", {
    x: 7,
    y:0,
    color: color`2`})
      addText("Press D\nto shoot\n\nRemaining: " + shotsRemaining, {
    x: 6,
    y:11,
    color: color`2`})
    }

    level = 1 - level
    setMap(levels[level])
    
  } else{
    boot()
  }
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
