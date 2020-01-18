

function init()
{
    createBooks();
    console.log(gBooks);
    renderBooks();
}

function renderBooks()
{
    var strHtmls=''
    strHtmls=`<thead class="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Actions</th>
    </tr>
  </thead><tbody>`;
  for(var i=0;i<gBooks.length;i++)
    {
        strHtmls+=`<tr id="${gBooks[i].id}">
<td>${gBooks[i].id}</td><td>${gBooks[i].name}</td>  <td>${gBooks[i].price}</td><td>
            <button type="button" class="btn btn-success" data-id="${gBooks[i].id}"
                onclick="onReadPress(this)">Read</button>
            <button type="button" class="btn btn-success" data-id="${gBooks[i].id}"
                onclick="onUpdatePress(this)">Update</button>
            <button type="button" class="btn btn-danger" data-id="${gBooks[i].id}"
                onclick="onDeletePress(this)">Delete</button></td>
                  </tr>`

    }
    strHtmls+=`</tbody>`;
    $('.my-table').html(strHtmls);

}

function onSaveChanges()
{
    saveChanges();
    renderBooks();
}
function onDeletePress(th)
{
DeletePress(th.dataset.id);    
renderBooks();
}

function onAddNewBook()
{
    var name=prompt('please enter the new book name!');
    var price=+prompt('please enter the new book price');
    AddNewBook(name,price);
    renderBooks();
    
}
function prepUpdateModal()
{
    var strHtml=`<div><h6>Book ID :</h6><h6 class="book-id"></h6></div>
    <div><h5>Book name :</h5><input type="text" class="book-name"></div>
    <div><h5>Book price :</h5><input type="text" class="book-price"></div>
    <div><h5>Book Url :</h5><input type="text" class="book-url"></div>`;
    $('.update-book').html(strHtml);
}
function onUpdatePress(th)
{
    prepUpdateModal();
    updatePress(th.dataset.id);
    renderBooks();
}

function onClosePress()
{
    $('.modal').hide();
}

function onReadPress(th)
{
    
    readPress(th.dataset.id);
    renderBooks();

}