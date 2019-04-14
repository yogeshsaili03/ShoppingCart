$(() => {
    refreshList()
    filldropbox();
    $('#login').click(() => {
        window.localStorage.clear();
        window.location.href = '/';
    })

    $('#addproduct').click(() => {
        x = $.trim($('#productname').val().length);
        y = $.trim($('#productprice').val().length);
        z = $.trim($('#productQ').val().length);
        if (x == 0) {
            alert('Product Name is Empty')
        }

        else if (y == 0) {
            alert('Price is Empty')
        }

        else if (z == 0) {
            alert('Quantity is Empty')
        }
        else {
            $.post(
                '/product',
                {
                    name: $('#productname').val(),
                    price: $('#productprice').val(),
                    quantity: $('#productQ').val(),
                    vendorId: $('#vendorDropbox').val(),

                },
                (data) => {
                    if (data.success) {
                        alert('Data Entered Succesfully')
                        refreshList()
                        filldropbox()
                        $('#productname').val('');
                        $('#productprice').val('');
                        $('#productQ').val('');
                    }
                    else {
                        alert('Wrong Input data of Product')
                    }
                }
            )
        }
    })

    $('#addVendor').click(() => {
        window.location.href = './vendor.html';
    })
})

function filldropbox() {
    let dropbox = $('#vendorDropbox');
    dropbox.empty();
    $.get('/vendor', (data) => {
        for (let d of data) {
            dropbox.append(`<option value=${d.id}>${d.name}</option>`);
        }
    })
}
function refreshList() {
    $.get('/product', (data) => {
        $('#productlist').empty()

        for (let product of data) {
            $('#productlist').append(
                `<li> ProductId : ${product.id} <br> Product Name : ${product.name} <br> Product Price : ${product.price} <br> Quantity : ${product.quantity} <br> VendorName : ${product.vendor.name} <br> Action : <button class="deletebutton" id="${product.id}" onClick='deleteProduct(${product.id})'>Delete</button><br><br> </li>`
            )
        }
    })
}
function deleteProduct(id) {
    $.post('/product/:id',
        {
            id: id
        }, (data) => {
            if (data.success) {
                alert('Product Deleted')
                refreshList()
                filldropbox()
            }
            else {
                alert('Error Occured On Server Side')
            }
        })
}
