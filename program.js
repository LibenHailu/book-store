// Books to create books object
class Books {
    constructor(name, author, code) {
        this.name = name;
        this.author = author;
        this.code = code;
    }
}
//Store class handles storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return  books;
    }
    static addBook(book){
        const books = this.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(code){
        const books = this.getBooks();
        books.forEach((book,index) =>{
            if(book.code === code){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}
// Ui class used to handle ui 
class Ui {
    static availableBooks() {
        var books = Store.getBooks();
        books.forEach(book => {
            this.displayBooks(book)
        })

    };
    static displayBooks(book) {
        var list = document.querySelector('tbody');
        var row = document.createElement('tr');
        row.innerHTML = `<tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.code}</td>
        <td><a href="#" class="del btn btn-danger shadow-none" >X</a></td>
        </tr>`
        list.appendChild(row)
    };
    static deleteBook(el){
        if(el.classList.contains('del')){
            el.parentElement.parentElement.remove();
        }
        
    }
    static cleardata(){
        document.querySelector('#name').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#code').value = '';   
    }
    static showAlart(msg,alertType){
        const div  = document.createElement('div');
        div.className =  `alert alert-${alertType}`;
        div.appendChild(document.createTextNode(msg));
        const main = document.querySelector('.main');
        const title = document.querySelector('h4')
        main.insertBefore(div,title);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);
    }
}
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    var name = document.querySelector('#name').value;
    var author = document.querySelector('#author').value;
    var code = document.querySelector('#code').value;
    if(name == '' || author == '' || code == ''){
        Ui.showAlart('Please fill all fields','danger');     
    }else{
    const book =new Books(name, author, code);
    Ui.displayBooks(book);
    Store.addBook(book);
    Ui.showAlart('Book stored successfuly','success');
    Ui.cleardata();
    };
});
Ui.availableBooks();
document.querySelector('#book-list').addEventListener('click',(e)=>{
    Ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    Ui.showAlart('Book Removed','success');
})
