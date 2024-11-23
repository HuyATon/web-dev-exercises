$(() => {
    $('#submit-button').click(async () => {
        
        const x = parseFloat($('#x').val())
        const y = parseFloat($('#y').val())
        const operator = $('#operator').val()
        console.log(operator)

        if (isNaN(x) || isNaN(y)) {
            showFeedback('Please enter a valid number')
            return
        }
        if (operator === "divide" && y === 0) {
            showFeedback("Can not divide by zero")
            return 
        }
        const response = await fetch('/calculation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ x, y, operator })
        })
        if (response.ok) {
            const res = await response.json()
            $('#result').text(res.result)
        }
    })
})

function showFeedback(message) {
    $('#feedback').text(message)
    $('#feedback').removeClass('d-none')
}

