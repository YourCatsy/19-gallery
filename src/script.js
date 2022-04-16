
const TODO_ITEM_CLASS = 'todo-item';
const DONE_CLASS = 'done';

const listEl = document.querySelector('.todo-list');
const albumEl = document.querySelector('.todo-album');
const todoTemplateHTML = document.querySelector('#newTaskTemplate').innerHTML;
const albumImageTemplateHTML = document.querySelector('#album-photo-template').innerHTML;

listEl.addEventListener('click', onLineClick);

init();

function init() {
    ListApi.getList()
        .then((list) => {

            renderTodoList(list)
        })
        .catch(handleError);
}

function onLineClick(e) {
    e.preventDefault();

    const todoEl = getTodoElement(e.target)

    if (todoEl) {
        const id = getTodoElId(todoEl);

        if (id) {
            ListApi.getOne(id)
                .then((list) => {
                    renderAlbumList(list)
                })
                .catch(handleError);
        }
    }
}

function renderTodoList(todoList) {
    const html = todoList.map(generateTodoHtml).join('');
    listEl.innerHTML = html;
}

function handleError(e) {
    alert(e.message);
}

function generateTodoHtml(list) {
    const done = list.status ? DONE_CLASS : '';

    return todoTemplateHTML
        .replace('{{id}}', list.id)
        .replaceAll('{{title}}', list.title)
        .replace('{{done}}', done);
}

function renderAlbumList(list) {
    const html = list.map(generateAlbumHtml).join('');
    albumEl.innerHTML = html;
}

function generateAlbumHtml(list) {
    return albumImageTemplateHTML
        .replace('{{image-src}}', list.thumbnailUrl);
}

function getTodoElId(el) {
    return el.dataset.id;
}

function getTodoElement(target) {
    return target.closest('.' + TODO_ITEM_CLASS);
}