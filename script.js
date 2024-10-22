const baseUrl = "https://reqres.in/api/users"
let currentPage = 1
let totalPages = 0

$(async () => {

    totalPages = await getTotalPages()
    updateTable()
    createPagination()
    $(".page-item").on("click", handlePageChange)
})

async function updateTable() {

    const url = baseUrl + `?page=${currentPage}`
    const response = await fetch(url)
    if (response.ok) {
        const result = await response.json()
        const peopleData = result.data
        $("tbody").empty()

        peopleData.forEach(personData => {
            $("tbody").append(dataToPersonUI(personData))
        })
    }
}

async function getTotalPages() {
    const response = await fetch(baseUrl + `?/page=${1}`)
    if (response.ok) {
        const result = await response.json()
        return parseInt(result.total_pages)
    }
}

function dataToPersonUI(dataObject)  {
    return `
                            <tr>
                                <th scope="row">${dataObject.id}</th>
                                <td>${dataObject.first_name}</td>
                                <td>${dataObject.last_name}</td>
                                <td>${dataObject.email}</td>
                                <td><image src=${dataObject.avatar} class="rounded"></td>
                            </tr>
    `
}

function createPagination() {
    let pageItems = ""

    for (let page = 1; page <= totalPages; page++) {

        pageItems += `<li class="page-item page-item ${page == currentPage ? "active" : ""}"><a class="page-link" href="#">${page}</a></li>`
    }
    $("#pagination").empty()
    $("#pagination").append(
        `
                            <li class="page-item backward-page ${currentPage == 1 ? "disabled" : ""}">
                                <a class="page-link" href="#" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>

                              ${pageItems}

                            <li class="page-item forward-page ${currentPage == totalPages ? "disabled" : ""}">
                                <a class="page-link" href="#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
        `
    )
}

async function handlePageChange() {
    if ($(this).hasClass("backward-page")) {
        if (currentPage > 1) {
            currentPage -= 1
        }
    }
    else if ($(this).hasClass("forward-page")) {
        if (currentPage < totalPages) {
            currentPage += 1
        }
    }
    else {
        const pageValue = $(this).text()
        const parsedPage = parseInt(pageValue)
        currentPage = parsedPage
    }

    createPagination()
    updateTable()
    $(".page-item").on("click", handlePageChange)
}