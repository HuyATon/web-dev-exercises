let squares = $(".square")
let chesses = $(".chess-piece")

// let target = null

// chesses.forEach(chess => {

//     chess.addEventListener("mousedown", () => {

//         target = chess
//     })
// })

// squares.forEach(square => {

//     square.addEventListener("dragover", event => {

//         // add only when there is a free space
//         if (!square.querySelector(".chess-piece")) {
//             square.appendChild(target)
//         }
//     })
// })


$( () => {
    $(".chess-piece").draggable()
})