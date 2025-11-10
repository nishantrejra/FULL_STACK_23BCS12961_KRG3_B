import axios from "axios";

const BASE_URL = "http://localhost:8080/books";

class BookService {
    getAllBooks() {
        return axios.get(BASE_URL);
    }

    addBook(book) {
        console.log("Sending book:", book);
        return axios.post(`${BASE_URL}/save`, book, {
            headers: { "Content-Type": "application/json" },
        });
    }

    updateBook(id, book) {
        return axios.put(`${BASE_URL}/${id}`, book, {
            headers: { "Content-Type": "application/json" },
        });
    }

    deleteBook(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    getBookById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }
}

export default new BookService();
