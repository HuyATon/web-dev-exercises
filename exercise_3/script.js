$("form").on("submit", event => {
    

    const fullname = $("#fullname").val()
    const username = $("#username").val()
    const email = $("#email").val()
    const phone = $("#phone").val()
    const birthday = new Date($("#birthday").val())


    const fullnameRegex = /^(?:[A-Z][a-z]*\s*)+$/
    const usernameRegex = /^(?![0-9])[a-zA-Z0-9_]+$/
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const phoneRegex = /^0\d{9}$/

    if (!fullnameRegex.test(fullname)) {
        showMessage("Chữ cái đầu tiên chưa viết hoa")
        return 
    }

    if (!usernameRegex.test(username)) {
        showMessage("Username chỉ gồm các ký tự, ký số và dấu _, không được bắt đầu bởi ký số")
        return 
    }

    if (!emailRegex.test(email)) {
        showMessage("Email chưa đúng định dạng")
        return 
    }

    if (!phoneRegex.test(phone)) {
        showMessage("SĐT chưa đúng định dạng")
        return 
    }

    const currentYear = new Date().getFullYear()
    const age = currentYear - birthday.getFullYear()

    if (isNaN(age)) {
        showMessage("Ngày sinh không hợp lệ")
        return
    }
    if (age < 15 || age > 55) {
        showMessage("Tuổi không nằm trong khoảng [15, 55]")
        return
    }

    showMessage("Thông tin hợp lệ", true)
    
})





function showMessage(message, sucess = false) {
    errorView = $("#error").html(message)
    error.style.backgroundColor = sucess ?  "rgb(226, 242, 216)": "rgb(242, 217, 219)"

}