$(() => {

    if (window.localStorage.getItem('userId') == null) {
        $('#cartitemin').hide();
        $('#cartitem').hide();
        $('#logout').hide();
        refreshList()

    } else {
        x = window.localStorage.getItem('userName')
        $("#username").text("Welcome " + x + "!");
        refreshList()
        cartQuantity()
    }
    $('#cart').click(() => {

        window.location.href = './cartItems.html';
    })
    $('#cartitem').click(() => {

        window.location.href = './cartItems.html';
    })
    $('#cartitemin').click(() => {

        window.location.href = './cartItems.html';
    })
    
    $('#logout').click(() => {
        window.localStorage.clear();
        window.location.href = '/';
    })
})


function refreshList() {

    $.get('/product', (data) => {
        $('#productlist').empty()

        for (let product of data) {
            $('#productlist').append(
                `<li> ProductId : ${product.id} <br> Product Name : ${product.name} <br> Product Price : ${product.price} <br> VendorId : ${product.vendor.name} <br> Action : <button class="deletebutton" id="addcart" onClick='addProductCart(${product.id},${product.vendor.id})'>Add to Cart</button> <br><br> </li>`
            )
        }
    })


}

function addProductCart(id, vid) {

    if (window.localStorage.getItem('userId') == null) {
        alert('Please login First to Add Products to Cart')
        window.location.href = '/';
    }
    else {
        $.post('/productcart/:id',
            {
                id: id,
                vid: vid,
                quantity: 1,
                userId: window.localStorage.getItem('userId'),

            }, (data) => {
                console.log(data)
                if (data.success) {
                    alert('Product Added')
                    countCartQuan(data.quan)
                    refreshList()
                }
                else {
                    alert('Error Occured On Server Side')
                }
            })
    }
}

function cartQuantity() {
    $.post('/cartQuantity/:id',
        {
            userId: window.localStorage.getItem('userId'),
        }, (data) => {
            if (data.success) {
                countCartQuan(data.quan)
            }
            else {
                alert('Error Occured On Server Side')
            }
        })
}

function countCartQuan(data) {
    c = 0;
    for (let product of data) {
        c = c + product.quantity
    }
    $("#cartitemin").text(c)
}