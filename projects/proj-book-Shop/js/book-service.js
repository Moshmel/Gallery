var gBooks = [];
const BOOKS_IN_PAGE=5;

function createBooks() {
    for (let i = 0; i < 20; i++) {
        gBooks.push(createBook())
    }

}

function createBook() {
    var bookNames = ['book', 'small-book', 'action-drama',
        'a good book', 'a nice book', 'a pretty book'
        , 'magnuv']
    var book = {
        id: makeId(),
        name: bookNames[getRandomIntInclusive(0, 6)],
        price: getRandomIntInclusive(10, 60),
        imgUrl: 'img/1.png'
    }
    return book;
}
function DeletePress(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    });

    gBooks.splice(idx, 1);

}
function AddNewBook(name, price) {
    var book = {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: 'img/1.png'
    }
    gBooks.push(book);
}
//the id of the tr and the id of the book are the same
function updatePress(trId) {
    var book = getBookById(trId); 
    $('.modal').show();
    $('.book-id').text(`${book.id}`);
    $('.update-book .book-name').val(`${book.name}`);
    $('.update-book .book-price').val(`${book.price}`);
    $('.update-book .book-url').val(`${book.imgUrl}`);

}
function saveChanges()
{
    var book=createBook();
    book.id=$('.book-id').text();
    book.name=$('.update-book .book-name').val();
    book.price=$('.update-book .book-price').val();
    book.imgUrl=$('.update-book .book-url').val(`${book.imgUrl}`);
    var idx = gBooks.findIndex(function (book) {
        return book.id === book.id;
    });
    gBooks[idx]=book;
    $('.modal').hide();

}
function getBookById(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    });
    return gBooks[idx];
}

function readPress(id)
{
    var book=getBookById(id);
    var strHtml=`<span><img src="${book.imgUrl}" alt="Smiley face" height="150" width="150"><span>
    <span><h6>Book ID : ${book.id}</h6></span>
    <span><h5>Book name : ${book.name}</h5></span>
    <span><h5>Book price :${book.price}</h5></span>`
    

    $('.modal-body').html(strHtml);
    $('.modal').show();
    console.log(strHtml)

}