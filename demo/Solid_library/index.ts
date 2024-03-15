interface IBookRepository {
  addBook(book: Book): void
  updateBook(book: Book): void
  deleteBook(id: string): void
}

interface IBookBorrow {
  borrowBook(bookLoaned: Loan): void
}

interface IBookReturnable {
  returnBook(id: string): void
}

class Book {
  id: string
  title: string
  author: string
  genre: string

  constructor({id, title, author, genre}: {id: string, title: string, author: string, genre: string}) {
    this.id = id
    this.title = title
    this.author = author
    this.genre = genre
  }
}

class BookRepository implements IBookRepository, IBookBorrow, IBookReturnable {
  private books: Book[] = []
  private loans: Loan[] = []

  addBook(book: Book): void {
    this.books.push(book)
  }

  deleteBook(id: string): void {
    const index = this.books.findIndex(book => book.id === id)

    if (index !== -1) {
      this.books.splice(index, 1)
    }
    else {
      console.log(`Book with ID ${id} not found.`)
    }
  }

  updateBook(book: Book): void {
    const index = this.books.findIndex(b => b.id === book.id)

    if (index !== -1) {
      this.books[index] = book
    }
    else {
      console.log(`Book with ID ${book.id} not found.`)
    }
  }

  borrowBook(bookLoaned: Loan): void {
    const index = this.books.findIndex(book => book.id === bookLoaned.book.id)

    if (index !== -1) {
      this.loans.push(bookLoaned)
    }
    else {
      console.log(`Book with ID ${bookLoaned.book.id} not found.`)
    }
  }

  returnBook(id: string): void {
    const index = this.loans.findIndex(loan => loan.book.id === id)
    if (index !== -1) {
      this.loans.splice(index, 1)
    }
    else {
      console.log(`Book with ID ${id} not found.`)
    }
  }
}

class Library {
  constructor(private bookRepository: BookRepository) {}

  addBook(book: Book): void {
    this.bookRepository.addBook(book)
  }

  updateBook(book: Book): void {
    this.bookRepository.updateBook(book)
  }

  deleteBook(id: string): void {
    this.bookRepository.deleteBook(id)
  }
}

class Loan {
  book: Book
  borrower: string
  dueDate: Date

  constructor(private bookRepository: BookRepository, {book, borrower, dueDate}: {book: Book, borrower: string, dueDate: Date}) {
    this.book = book
    this.borrower = borrower
    this.dueDate = dueDate
  }

  borrowBook(): void {
    this.bookRepository.borrowBook(this)
  }

  returnBook(id: string): void {
    this.bookRepository.returnBook(id)
  }
}

const book_1 = new Book({id: '1', title: 'Book 1', author: 'Author 1', genre: 'Genre 1'})
const book_2 = new Book({id: '2', title: 'Book 2', author: 'Author 2', genre: 'Genre 2'})
const book_3 = new Book({id: '3', title: 'Book 3', author: 'Author 3', genre: 'Genre 3'})

const bookRepository = new BookRepository()
const library = new Library(bookRepository)
library.addBook(book_1)