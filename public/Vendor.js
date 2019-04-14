function refreshList() {
  $.get('/vendor', (data) => {
    $('#vendorlist').empty()
    for (let vendor of data) {
      $('#vendorlist').append(
        `<li> VendorId : ${vendor.id} <br> Vendor Name : ${vendor.name} <br> Action : <button class="deletebutton" id="${vendor.id}" onClick='deleteVendor(${vendor.id})'>Delete</button><br><br><br> </li>`
      )
    }
  })
}
refreshList()
function deleteVendor(id) {
  $.post('/vendor/:id',
    {
      id: id
    }, (data) => {
      if (data.success) {
        alert('Vendor Deleted')
        refreshList()
      }
      else {
        alert('Error Occured On Server Side')
      }
    })
}

$('#login').click(() => {
  window.localStorage.clear();
  window.location.href = '/';
})

$('#addvendor').click(() => {
  x = $.trim($('#vendorname').val().length);
  if (x == 0) {
    alert('Vendor Name is Empty')
  } else {
    $.post(
      '/vendor',
      {
        name: $('#vendorname').val()
      },
      (data) => {
        if (data.success) {
          alert('Data Entered Succesfully')
          $('#vendorname').val('');
          refreshList()

        }
        else {
          alert('Duplicate Vendor')
        }
      }
    )
  }
})

$('#productpage').click(() => {
  window.location.href = './product.html';
})

