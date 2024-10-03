let squares = document.querySelectorAll(".square")
let chesses = document.querySelectorAll(".chess-piece")

let target = null
let oldCell = null

chesses.forEach(chess => {

    chess.addEventListener("mousedown", () => {

        target = chess
    })
})

squares.forEach(square => {

    square.addEventListener("dragover", event => {

        // add only when there is a free space
        if (!square.querySelector(".chess-piece")) {
            square.appendChild(target)
        }
    })
})

