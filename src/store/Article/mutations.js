export function Add(state, article) {
    state.articles.push(article);
}

export function Articles(state, articles) {
    state.articles = articles;
}

export function Loading(state, loading) {
    state.loading = loading;
}

export function User(state, user) {
    state.user = user;
}

export function Remove(state, id) {
    const filter = state.articles.filter(article => article.id != id);
    state.articles = filter
}