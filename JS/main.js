// Declaration of Global Variables
let productNameInput = document.querySelector('#productName');
let productPriceInput = document.querySelector('#productPrice');
let productCategoryInput = document.querySelector('#productCategory');
let productContainer = [];
let isDataExistsInTheLocalStorage = localStorage.getItem('products');
let updateBtn = document.querySelector('.updateBtn');
let addBtn = document.querySelector('.addBtn');
let updateInFormBtn = document.querySelector('.updateInFormBtn');
let discardInFormBtn = document.querySelector('.discardInFormBtn');
// Search input
let searchInput = document.querySelector('#search');
// Validation variables
let productReqired = document.querySelector('.product-reqired');
let productNameDuplicated = document.querySelector('.product-name-duplicated');
let productPriceReqired = document.querySelector('.product-price-reqired');

// Retrive the data if it exists
(function (){
    if(isDataExistsInTheLocalStorage !== null)
{
    productContainer = JSON.parse(isDataExistsInTheLocalStorage);
    displayProducts(productContainer);
};
})();
// Add Product Function
function addProduct()
{
    let isProductNameDuplicated = 0;
    for(let i = 0; i < productContainer.length; i++)
    {
        if(productContainer[i].productName === productNameInput.value)
        {
            isProductNameDuplicated++;
        }
    }
    if(productNameInput.value === '' && productPriceInput.value === '')
    {
        productReqired.classList.replace('d-none' , 'd-block');
        productPriceReqired.classList.replace('d-none' , 'd-block');
    }
    else if(isProductNameDuplicated > 0 && productPriceInput.value === '')
    {
        productNameDuplicated.classList.replace('d-none' , 'd-block');
        productPriceReqired.classList.replace('d-none' , 'd-block');
    }
    else if(productPriceInput.value === '')
    {
        productPriceReqired.classList.replace('d-none' , 'd-block');
    }
    else if(isProductNameDuplicated > 0)
    {
        productNameDuplicated.classList.replace('d-none' , 'd-block');
    }
    else 
    {
        let product = {
            productName: productNameInput.value,
            productPrice: productPriceInput.value,
            productCategory: productCategoryInput.value
        }
        productContainer.push(product);
        saveProducts();
        displayProducts(productContainer);
        clearForm();
        console.log(productContainer);
        productReqired.classList.replace('d-block' , 'd-none');
        productNameDuplicated.classList.replace('d-block' , 'd-none');
        productPriceReqired.classList.replace('d-block' , 'd-none');
    
    }
};
// Save Products to Local Storage
function saveProducts()
{
    localStorage.setItem( 'products' , JSON.stringify(productContainer));
};
// Display data in the table
function displayProducts(arr)
{
    let product = '';
    for(let i = 0; i < arr.length; i++)
    {
        product += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${arr[i].productName}</td>
        <td>${arr[i].productPrice}</td>
        <td>${arr[i].productCategory}</td>
        <td><button onclick="updateProduct(${i});" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-danger updateBtn">Delete</button></td>
      </tr>`;
    }
    document.querySelector('tbody').innerHTML = product;
};
// clear the form
function clearForm()
{
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
};
// delete product by index
function deleteProduct(index)
{
    productContainer.splice(index, 1);
    displayProducts(productContainer);
    saveProducts();
    console.log(productContainer);
};
// Searching event
searchInput.addEventListener('input', function(){
    searchFunction(searchInput.value);
});
// Searching function
function searchFunction(target)
{
    let searchingProducts = [];
    for(let i = 0; i < productContainer.length; i++)
    {
        // Write Your Condition here
        if( productContainer[i].productName.toLowerCase().includes(target.toLowerCase()))
        {
            searchingProducts.push(productContainer[i]);
        }

    }
    displayProducts(searchingProducts);
};
// Update Product
function updateProduct(index)
{
    productNameInput.value = productContainer[index].productName;
    productPriceInput.value = productContainer[index].productPrice;
    productCategoryInput.value = productContainer[index].productCategory;
    updateInFormBtn.classList.replace('d-none' , 'd-block');
    discardInFormBtn.classList.replace('d-none' , 'd-block');
    addBtn.classList.replace('d-block' , 'd-none');
    updateInFormBtn.addEventListener('click' , function(){
        editProduct(index);
        addBtn.classList.replace('d-none' , 'd-block');
        updateInFormBtn.classList.replace('d-block' , 'd-none');
        discardInFormBtn.classList.replace('d-block' , 'd-none');
    });
    discardInFormBtn.addEventListener('click' , function(){
        clearForm();
        addBtn.classList.replace('d-none' , 'd-block');
        updateInFormBtn.classList.replace('d-block' , 'd-none');
        discardInFormBtn.classList.replace('d-block' , 'd-none');
    });


    
}
// Edit Product
function editProduct(index)
{
    let tempProductsContainer = [];
    let editProduct = {
        productName: productNameInput.value,
        productPrice: productPriceInput.value,
        productCategory: productCategoryInput.value
    };
    for(let i = 0; i < productContainer.length; i++)
    {
        if(i === index)
        {
            tempProductsContainer.push(editProduct);
        }
        else
        {
            tempProductsContainer.push(productContainer[i]);
        }
    };
    productContainer = tempProductsContainer;
    displayProducts(productContainer);
    saveProducts();
    clearForm();
};