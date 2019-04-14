$(() => {

    $('#vendorpage').click(() => {
        window.localStorage.clear();
        window.location.href = './vendor.html';
    })

    $('#login').click(() => {
        x = $.trim($('#username').val().length);
        if (x == 0) {
            alert('UserName is Empty')
        }
        else {
            $.get(
                '/user',
                {
                    name: $('#username').val()
                },
                (data) => {
                    let user = data
                    console.log(user.id + " " + data.id + " " + data.message);

                    if (user.id != null) {
                        window.localStorage.setItem('userId', data.id)
                        window.localStorage.setItem('userName', data.name)
                        window.location.href = './productListing.html';
                    }
                    else {
                        alert('Invalid User')
                    }
                }
            )
        }
    })

})
