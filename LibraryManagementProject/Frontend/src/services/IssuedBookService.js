import axios from "axios";

const BASE_URL = "http://localhost:8080/issued-books";

class IssuedBookService {
    getAllIssuedBooks() {
        return axios.get(BASE_URL);
    }

    issueBook(bookId, memberId) {
        return axios.post(`${BASE_URL}/issue/${bookId}/${memberId}`, null, {
            headers: { "Content-Type": "application/json" },
        });
    }

    returnBook(issuedBookId) {
        return axios.put(`${BASE_URL}/return/${issuedBookId}`);
    }

    deleteIssuedBook(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

export default new IssuedBookService();
