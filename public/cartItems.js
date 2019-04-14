$(() => {

    if (window.localStorage.getItem('userId') == null) {
        alert('Please login First to view Cart')
        window.location.href = '/';
    } else {
        x = window.localStorage.getItem('userName')
        $("#username").text("Welcome " + x + "!");
        listodcart()
    }
    $('#product').click(() => {
        window.location.href = './productListing.html';
    })

    $('#logout').click(() => {
        window.localStorage.clear();
        window.location.href = '/';
    })
})

function listodcart() {
    $.get('/cart', {
        userId: window.localStorage.getItem('userId')
    }, (data) => {
        $('#cartlist').empty()
        x = 0;
        for (let cart of data) {
            total = cart.product.price * cart.quantity
            x = x + total;
            $('#cartlist').append(
                createCard(cart)
                //`<li> CartId : ${cart.id} <br> ProductName : ${cart.product.name} <br> Price : ${cart.product.price} <br> Provider: ${cart.product.vendor.name} <br> Quantity : <button class="dec" id="dec" onClick='updateItemDec(${cart.id},${cart.quantity})'>-</button> ${cart.quantity} <button class="inc" id="inc" onClick='updateItemInc(${cart.id})'>+</button> <br> Total Price: ${total} <br><br> </li>`
            )
        }


        $("#total").text("Total Cart Value: " + x)
    }
    )
}

function updateItemDec(id, quantity) {
    if (quantity == 1) {
        deleteCart(id)
    }
    else {
        $.post('/productcartDec/:id',
            {
                id: id,
            }, (data) => {
                if (data.success) {
                    listodcart()
                }
                else {
                    alert('Error Occured On Server Side')
                }
            })
    }

}

function updateItemInc(id) {

    $.post('/productcartInc/:id',
        {
            id: id
        }, (data) => {
            if (data.success) {
                listodcart()
            }
            else {
                alert('Error Occured On Server Side')
            }
        })
}




function deleteCart(id) {
    $.post('/productcartDel/:id',
        {
            id: id,
        }, (data) => {
            if (data.success) {
                alert('Product Deleted From Cart')

                listodcart()
            }
            else {
                alert('Error Occured On Server Side')
            }
        })
}

function createCard(cart) {
    console.log(cart);

    return $(`
    <br><br>
    <div class="cards-list" style=" z-index: 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;">
        <div class="card" style="margin: 30px auto;
        width: 300px;
        height: 300px;
        border-radius: 40px;
        box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25), -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
        cursor: pointer;
        transition: 0.4s;">
            <div class="card_title" style=" text-align: center;
        border-radius: 0px 0px 40px 40px;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 30px;
        margin-top: -80px;
        height: 40px;">
                <div class="card_image" style="width: inherit;
        height: inherit;
        border-radius: 40px;">
    
        <div class="card_title" style=" color: black;
        text-align: center;
        border-radius: 0px 0px 40px 40px;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 30px;
        margin-top: 100px;
        height: 40px;">
        CartId : ${cart.id} <br> ProductName : ${cart.product.name} <br> Price : ${cart.product.price} <br> Provider: ${cart.product.vendor.name} <br> Quantity : <button class="dec" id="dec" onClick='updateItemDec(${cart.id},${cart.quantity})'>-</button> ${cart.quantity} <button class="inc" id="inc" onClick='updateItemInc(${cart.id})'>+</button> <br> Total Price: ${total} <br><br>

            </div>
        </div>
    </div>`)

}