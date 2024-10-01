// check input


let numberInputs = document.querySelectorAll(`input[type="text"]`)

numberInputs.forEach( (input, index) => {
    input.addEventListener('focusout', () => {

        const regex = new RegExp('^[+-]?\\d+(\\.\\d+)?$')

        if (!regex.test(input.value)) {
            showNotification(`Lỗi: Số thứ ${index + 1} không phải là số thực`)
        }
        else {
            showNotification("")
        }

    })
})

// calculate
let calculateButton = document.getElementById("calculate-button")


calculateButton.addEventListener('click', () => {
    
    const selectedOperator = document.querySelector('input[name="operator"]:checked')
   
    const firstNumber = document.getElementById("firstNumber").value
    const secondNumber = document.getElementById("secondNumber").value

    const regex = new RegExp('^[+-]?\\d+(\\.\\d+)?$')

    if (firstNumber.length === 0 || secondNumber.length === 0) {
        showNotification("Lỗi: Chưa điền đủ hai số để tính")
        return
    }

    if (!selectedOperator) {
        showNotification("Lỗi: Chưa chọn phép tính")
        return
    }

    if (!regex.test(firstNumber) || !regex.test(secondNumber)) {
        showNotification("Lỗi: Số nhập vào không phải là số thực")
        return
    }

    let parsedFirstNumber = parseFloat(firstNumber)
    let parsedSecondNumber = parseFloat(secondNumber)


    // show answer
    const answer = document.getElementById("answer")

    console.log(selectedOperator.value)

    switch (selectedOperator.value) {

        case "plus":
            result = parsedFirstNumber + parsedSecondNumber
            break

        case "minus":
            result = parsedFirstNumber - parsedSecondNumber
            break

        case "mul":
            result = parsedFirstNumber * parsedSecondNumber
            break

        case "div":
            if (parsedSecondNumber === 0) {
                showNotification("Lỗi: Không thể chia cho 0")
                return
            }
            else {
                result = parsedFirstNumber / parsedSecondNumber
            }
            break

    }
    answer.textContent = result
    console.log(result)

    disableNotification()

})


function showNotification(someErorr) {

    const notification = document.getElementById("notification")
    notification.textContent = someErorr
    notification.style.color = "red"
    notification.style.fontWeight = "600"
}

function disableNotification() {
    const notification = document.getElementById("notification")
    notification.textContent = ""
}