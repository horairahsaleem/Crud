var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function onDelete(td) {
  if (confirm('Do you want to delete this record?')) {
    const productId = td.parentElement.parentElement.cells[0].innerHTML;

    $.ajax({
      url: `http://localhost:8080/products/${productId}`,
      method: 'DELETE',
      success: function(response) {
        if (response.success) {
          // Record deleted successfully
          // Remove the record from the table
          td.parentElement.parentElement.remove();
          resetForm();
        } else {
          // Error deleting record
          alert('Error deleting record: ' + response.message);
        }
      }
    });
  }
}

//Insert the data
function insertNewRecord(data) {
  $.ajax({
    url: 'http://localhost:8080/products',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(response) {
      if (response.success) {
        // New record created successfully
        // Update the table with the new record
        var table = $('#storeList').find('tbody');
        var newRow = table.append('<tr></tr>');

        newRow.append('<td>' + data.productCode + '</td>');
        newRow.append('<td>' + data.product + '</td>');
        newRow.append('<td>' + data.qty + '</td>');
        newRow.append('<td>' + data.perPrice + '</td>');
        newRow.append('<td><button onclick="onEdit(this)">Edit</button> <button onclick="onDelete(this)">Delete</button></td>');
      } else {
        // Error creating new record
        alert('Error creating new record: ' + response.message);
      }
    }
  });
}

//Edit the data
function updateRecord(formData) {
  $.ajax({
    url: 'http://localhost:8080/products/' + selectedRow.cells[0].innerHTML,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
      if (response.success) {
        // Record updated successfully
        // Update the table with the updated record
        selectedRow.cells[0].innerHTML = formData.productCode;
        selectedRow.cells[1].innerHTML = formData.product;
        selectedRow.cells[2].innerHTML = formData.qty;
        selectedRow.cells[3].innerHTML = formData.perPrice;
        selectedRow = null;
        resetForm();
      } else {
        // Error updating record
        alert('Error updating record: ' + response.message);
      }
    }
  });
}
//Delete the data
function onDelete(td) {
  if (confirm('Do you want to delete this record?')) {
    const productId = td.parentElement.parentElement.cells[0].innerHTML;

    $.ajax({
      url: `http://localhost:8080/products/${productId}`,
      method: 'DELETE',
      success: function(response) {
        if (response.success) {
          // Record deleted successfully
          // Remove the record from the table
          td.parentElement.parentElement.remove();
          resetForm();
        } else {
          // Error deleting record
          alert('Error deleting record: ' + response.message);
        }
      }
    });
  }
}


//Reset the data
function resetForm() {
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}
