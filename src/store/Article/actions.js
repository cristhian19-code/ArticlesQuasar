import { db, auth, storage } from '../../boot/firebase'
import { Notify } from 'quasar';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

function Notification(message, color, icon) {
    Notify.create({
        message: message,
        position: 'top-right',
        color: color,
        icon: icon,
    })
}


// Operaciones con los articulos (add,delete,update)--------------------------------------

// Obtener todos los articulos de la bd

export async function GetArticles({ commit }, option) {
    let articulos = [];

    commit('Articles', []);

    moment.locale('es');

    if (option.mode == 'all') {
        await db.collection('articles').get().then((query) => {
            query.forEach((doc) => {
                articulos.push({ data: doc.data(), id: doc.id });
            })
        })
    } else if (option.mode == 'my-articles') {
        await db.collection('articles').get().then((query) => {
            query.forEach((doc) => {
                let article = doc.data();
                if (option.email == article.profile) {
                    article = {
                        id: doc.id,
                        title: doc.data().title,
                        author: doc.data().author,
                        date: moment(article.date).format('L'),
                    }
                    articulos.push(article);
                }
            })
        })
    }

    commit('Articles', articulos);
}

//Editar articulos en la bd
export async function EditArticles({ commit }, payload) {
    commit('Loading', true);
    try {
        await db.collection('articles').doc(payload.id).update(payload.data);
        Notification('Articulo editado correctamente', 'green', 'check')
    } catch (error) {
        Notification('Hubo un problema o articulo no encontrado', 'red', 'close')
    }

    commit('Loading', false);
}

//Eliminar articulo en la bd

export async function RemoveArticles({ commit }, id) {
    commit('Loading', true);
    try {
        await db.collection('articles').doc(id).delete();
        Notification('Articulo eliminado correctamente', 'green', 'check')
        commit('Remove', id)
    } catch (error) {
        Notification('Hubo un problema o articulo no encontrado', 'red', 'close')
    }

    commit('Loading', false);
}

// Agregar articulos a la bd
export async function AddArticle({ commit, state }, article) {
    commit('Loading', true);

    const { title, description, file } = article;
    if (title || description || file) {
        try {
            // Referencia para obtener el id unico en donde se guardara el articulo
            const id = uuidv4();

            // Almacenamiento de la foto en el storage e firebase
            const refImage = storage.ref().child(state.user.email)
                .child('Articulos')
                .child(id);

            await refImage.put(file);
            // Obteniendo la url del archivo subido
            const urlImage = await refImage.getDownloadURL();

            // creando un json del articulo
            const articulo = {
                title,
                description,
                url: urlImage,
                profile: state.user.email,
                author: state.user.nombre,
                date: Date.now()
            }

            // Almacenando todos los datos del articlo en firestore
            await db.collection('articles').doc(id).set(articulo)

            Notification('Articulo agregado', 'green', 'check')
        } catch (error) {
            Notification('Error al agregar articulo', 'red', 'block')
        }
    } else {
        Notification('Casilleron vacios', 'red', 'block')
    }
    commit('Loading', false);
}

// Operaciones con el ususario (login,signup,signout)-------------------------------

// Logeo del usuario  en la pagina
export async function Login({ commit }, login) {
    commit('Loading', true);

    try {
        const res = await auth.signInWithEmailAndPassword(login.email, login.password);

        const user = await res.user;

        if (user) {
            const res_db = await db.collection('users').doc(user.email).get();
            const user_db = await res_db.data()

            Notification('Logeado exitosamente', 'green', 'check')

            localStorage.setItem('user', JSON.stringify(user_db));
            commit('User', user_db)
        } else {
            commit('User', null)
            Notification('Credenciales incorrectas o usuario no existente', 'red', 'close')
        }
    } catch (error) {
        commit('Loading', false);
    }
    commit('Loading', false);

}

// Registro de usuario y almacenamiento en la BD
export async function Signup({ commit }, signup) {
    commit('Loading', true);

    const res_user = await db.collection('users').doc(signup.save.email).get();
    const user = await res_user.data();
    if (!user) {
        const res_login = await auth.createUserWithEmailAndPassword(signup.save.email, signup.password)

        const user = res_login.user;
        signup.save.uid = user.uid;

        await db.collection('users').doc(user.email).set(signup.save)
        Notification('Usuario Registrado', 'green', 'check')
    } else {
        Notification('Cuenta en uso', 'red', 'close')
    }
    commit('Loading', false);
}

//Obteniendo los datos de el guadado de firebase y almacenarlos en una varible del store
export async function GetUser({ commit }, user) {
    if (user) {
        const res = await db.collection('users').doc(user.email).get();

        const getUser = res.data();

        commit('User', getUser)
    } else {
        commit('User', null)
    }
}

// Cerrando sesion
export async function Signout({ commit }) {
    await auth.signOut();
    localStorage.removeItem('user');
    commit('User', null)
}
