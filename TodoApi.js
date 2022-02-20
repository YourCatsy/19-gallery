class TodoApi {
    static URL = 'https://jsonplaceholder.typicode.com/albums';
    static URL_ID = 'https://jsonplaceholder.typicode.com/photos?albumId=';
    static getList() {
        return fetch(this.URL)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Нет списка.');
        });
    }

    static getOne(id) {
        return fetch(this.URL_ID + id)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Нет строки с id '${id}'.`);
        });
    }
    static update(id, todo) {
        return fetch(this.URL + id, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Невозможно обновить список.');
        });
    }

}
export default TodoApi;