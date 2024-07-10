// get all element
let title = document.getElementById('title'),
    price = document.getElementById('price'),
    taxe = document.getElementById('taxe'),
    ads = document.getElementById('ads'),
    discount = document.getElementById('discount'),
    total = document.getElementById('total',)
    count = document.getElementById('count'),
    category = document.getElementById('category'),
    search_title = document.getElementById('search-title'),
    search_category = document.getElementById('search-category'),
    add_product = document.getElementById('add_product'),
    div_Delete_All = document.querySelector('#delete-all'),
    arrayPro = [],
    mod = "create";
let tmp;


// ---------------------------- check if data in local storage --------------------------------
if (localStorage.product != null) {
    arrayPro = JSON.parse(localStorage.getItem('product'));
}
// window in load show product in page
showProduct();
//-------------------------------------- function total------------------------------------------
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxe.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.backgroundColor = 'rgb(105, 175, 35)';

    } else {
        total.innerHTML = '';
        total.style.backgroundColor = '#a00d02';
    }
}
//----------------------------------- create Product --------------------------------------------
add_product.onclick = function () {
    let i=0;
    let objPro = {
        title: title.value,
        price: price.value,
        taxe: taxe.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };

    // validation on data 
    if (title.value != '' && price.value != '' && category.value != '') {
        if (mod === "create") {
            // trigger function count product
            countPro(objPro);
        } else {
            mod = "update"
            arrayPro[tmp] = objPro;
            add_product.innerHTML = "Create";
            count.style.display = "block";
        }
        // clear input after  submit add product
        clearInputs();
    }

    // add product to local storage
    addProLocalStorage(arrayPro);
    // show product in page
    showProduct();
    // to change bacground color red || green
    getTotal();
}

// ------------------------------- repeat count of product function -----------------------------------------
function countPro(objPro) {
    if (objPro.count > 1) {
        for (let i = 0; i < objPro.count; i++){
            arrayPro.push(objPro);
        }
    }
    else {
        arrayPro.push(objPro);
    }
} 

//-------------------------------------- save data in local storage ----------------------------
function addProLocalStorage(arrayPro) {
    let products = JSON.stringify(arrayPro);
    localStorage.setItem('product', products);
}

//------------------------------------------- clear inputs ------------------------------------
function clearInputs() {
    title.value = '';
    price.value = '';
    taxe.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


//---------------------------------------- show products ----------------------------------------
function showProduct() {
    let row_Data = '';
    for (i = 0; i < arrayPro.length; i++){
        // console.log(i);
        row_Data +=
            `<tr>
            <td>${i+1}</td>
            <td>${arrayPro[i].title}</td>
            <td>${arrayPro[i].price}</td>
            <td>${arrayPro[i].taxe}</td>
            <td>${arrayPro[i].ads}</td>
            <td>${arrayPro[i].discount}</td>
            <td>${arrayPro[i].total}</td>
            <td>${arrayPro[i].category}</td>
            <td><button onclick = "updateProduct(${i})" id="update-product"><i class="bi bi-pencil-square" title="update"></i></button></td>
            <td><button onclick = "deleteProduct(${i})" id="delete-product"><i class="bi bi-trash-fill" title="delete"></i></button></td>
        </tr>`
    }
    document.getElementById('table_Body').innerHTML = row_Data;

    let delete_All = document.getElementById('delete-all');
    // -------------------- check if data to delete all product ------------------------
    if (arrayPro.length > 0) {
        delete_All.innerHTML = `<button onclick="deleteAllPro()">Delete All Product (${arrayPro.length})</button>`
    }
    else {
        delete_All.innerHTML = '';
    }

}
//------------------------------------- update products ---------------------------------------
function updateProduct(i) {
    // console.log(i);
    title.value = arrayPro[i].title;
    price.value = arrayPro[i].price;
    taxe.value = arrayPro[i].taxe;
    ads.value = arrayPro[i].ads;
    discount.value = arrayPro[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = arrayPro[i].category;

    add_product.innerHTML = "Update";
    mod = "update";
    tmp = i;

    // to scroll top when click on button Update
    scroll({
        top: 0,
        behavior : "smooth",
    });
}

// -------------------------------  Delete one product -----------------------------------------
function deleteProduct(pro) {
    // remove select element =>i 
    arrayPro.splice(pro, 1);
    // becuase array connect with local storage
    addProLocalStorage(arrayPro);
    // to update table automatic without refresh the page
    showProduct();
}

// -------------------------------  Delete all product -----------------------------------------
function deleteAllPro() {
    arrayPro = [];
    localStorage.removeItem('product');
    showProduct();
}
// ----------------------------------  get search mod -----------------------------------------
let searchMod = "title";
function getSearchMod(id) {

    search = document.getElementById('search');

    if (id === "search-title") {
        searchMod = "title";
    }
    else {
        searchMod = "category"
        search.placeholder = "search with category";
    }

    search.focus();
    search.value = "";
    search.placeholder = `search with ${searchMod}`;
    showProduct();

}

//-------------------------------- Searc h for specific product ----------------------------------
function searchProduct(value) {
    let row_Data = '';

    for (let i = 0; i < arrayPro.length; i++){
        if (searchMod == "title") {
            if (arrayPro[i].title.includes(value.toLowerCase())) {
                row_Data +=
                `<tr>
                    <td>${i + 1}</td>
                    <td>${arrayPro[i].title}</td>
                    <td>${arrayPro[i].price}</td>
                    <td>${arrayPro[i].taxe}</td>
                    <td>${arrayPro[i].ads}</td>
                    <td>${arrayPro[i].discount}</td>
                    <td>${arrayPro[i].total}</td>
                    <td>${arrayPro[i].category}</td>
                    <td><button onclick = "updateProduct(${i})" id="update-product"><i class="bi bi-pencil-square" title="update"></i></button></td>
                    <td><button onclick = "deleteProduct(${i})" id="delete-product"><i class="bi bi-trash-fill" title="delete"></i></button></td>
                </tr>`;

            }
        }
        else {
            if (arrayPro[i].category.includes(value.toLowerCase())) {
                console.log(arrayPro[i].category.includes(value))
                row_Data +=
                `<tr>
                    <td>${i + 1}</td>
                    <td>${arrayPro[i].title}</td>
                    <td>${arrayPro[i].price}</td>
                    <td>${arrayPro[i].taxe}</td>
                    <td>${arrayPro[i].ads}</td>
                    <td>${arrayPro[i].discount}</td>
                    <td>${arrayPro[i].total}</td>
                    <td>${arrayPro[i].category}</td>
                    <td><button onclick = "updateProduct(${i})" id="update-product"><i class="bi bi-pencil-square" title="update"></i></button></td>
                    <td><button onclick = "deleteProduct(${i})" id="delete-product"><i class="bi bi-trash-fill" title="delete"></i></button></td>
                </tr>`;
            }
        }
    }

    document.getElementById('table_Body').innerHTML = row_Data;

}
