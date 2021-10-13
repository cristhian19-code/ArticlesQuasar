<template>
    <q-dialog v-model="alert" medium class="col-7">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section  class="row items-center q-pb-none q-mb-md">
                <div class="text-h6">{{change_view ? 'Registrate' : 'Iniciar Sesion'}}</div>
                <q-space/>
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section v-if="!change_view" class="q-pt-none">
                <q-input :color="$v.login.email.$invalid ? 'red':'green'" type="email" class="q-mx-sm q-my-md" outlined v-model="login.email" label="Correo">
                    <template v-slot:prepend>
                        <q-icon name="alternate_email" />
                    </template>
                </q-input>
                <ul>
                    <li v-if="$v.login.email.$invalid && login.email.length > 0" class="text-red">Correo invalido</li>
                </ul>
                <q-input :color="$v.login.password.$invalid ? 'red':'green'" type="password" class="q-mx-sm q-my-md" outlined v-model="login.password" label="Contraseña">
                    <template v-slot:prepend>
                        <q-icon name="password" />
                    </template>
                </q-input>
                <ul>
                    <li v-if="$v.login.password.$invalid && login.password.length != 0" class="text-red">Tu contraseña tiene que tener mas de 6 caracteres</li>
                </ul>
            </q-card-section>

            <q-card-section v-else class="q-pt-none">
                <div class="row wrap q-my-md">
                    <q-input class="q-mr-sm col" outlined v-model="signup.nombre" label="Nombres">
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                    <q-input class="col" outlined v-model="signup.apellido" label="Apellidos">
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                </div>
                
                <div class="row justify-between q-my-md">
                    <q-input type="number" class="col-4" outlined v-model.number="signup.edad" label="Edad">
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                    <q-select class="col-7" outlined v-model="signup.sexo" :options="sexos" label="Selecciones su sexo" />
                </div>

                <q-input :color="$v.signup.email.$invalid ? 'red':'green'" type="email" class="col-12 q-mt-md" outlined v-model="signup.email" label="Correo">
                    <template v-slot:prepend>
                        <q-icon name="alternate_email" />
                    </template>
                </q-input>
                <ul>
                    <li v-if="$v.signup.email.$invalid && signup.email.length > 0" class="text-red">Correo invalido</li>
                </ul>
                
                <q-input :color="$v.signup.password.$invalid ? 'red':'green'" type="password" class="col-12 q-mt-md" outlined v-model="signup.password" label="Contraseña">
                    <template v-slot:prepend>
                        <q-icon name="password" />
                    </template>
                </q-input>
                <ul>
                    <li v-if="$v.signup.password.$invalid && signup.password.length != 0" class="text-red">Tu contraseña tiene que tener mas de 6 caracteres</li>
                </ul>
                <q-input :color="$v.signup.repeat_password.$invalid ? 'red':'green'" type="password" class="col-12 q-mt-md" outlined v-model="signup.repeat_password" label="Repetir Contraseña">
                    <template v-slot:prepend>
                        <q-icon name="password" />
                    </template>
                </q-input>
                <ul>
                    <li v-if="$v.signup.repeat_password.$invalid && signup.repeat_password.length != 0" class="text-red">Las contraseñas no coinciden</li>
                </ul>
            </q-card-section>

            <q-card-actions class="column" align="right">
                <!-- Botones de inicio o de registro -->
                <q-btn :loading="loading" v-if="!change_view" @click="Login(login)" flat label="Iniciar Sesion" color="primary"/>
                <q-btn :loading="loading" @click="Signup(
                    {
                        save:{
                            nombre: signup.nombre,
                            apellido: signup.apellido,
                            edad: signup.edad,
                            email: signup.email,
                            sexo: signup.sexo,
                            avatar: '',
                            fondo: '',
                            rol: 'user'
                        },
                        password: signup.password
                    }
                )" v-else flat label="Registrarme" color="primary"/>
                
                <!-- Cambio de vista de registro y de inicio -->
                <q-btn v-if="!change_view" @click="change_view = !change_view" :ripple="false" flat color="green" label="Aun no tiene una cuenta? Click Aqui" />
                <q-btn v-else @click="change_view = !change_view" :ripple="false" flat color="green" label="Ya estas registrado? Click Aqui" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { required, minLength, between , email , sameAs} from 'vuelidate/lib/validators'
import {inject} from '@vue/composition-api'
import {mapActions,mapState} from 'vuex'

export default {
    setup() {
        const alert = inject('alert');
        return {
            alert,
        }
    },
    data() {
        return {
            login:{
                email: '',
                password: ''
            },
            signup: {
                nombre: '',
                apellido: '',
                edad: '',
                email: '',
                password: '',
                repeat_password: '',
                sexo: ''
            },
            change_view: false,
            sexos: [
                'Marculino',
                'Femenino',
                'No definido'
            ],
        }
    },
    validations:{
        login: {
            email:{
                required,
                email
            },
            password:{
                required,
                minLength: minLength(6)
            }
        },
        signup:{
            edad:{
                between: between(12,70),
            },
            email:{
                required,
                email
            },
            password:{
                required,
                minLength: minLength(6)
            },
            repeat_password: {
                required,
                sameAddPassword: sameAs('password')
            }
        }
    },
    methods: {
        ...mapActions('Article',['Signup','Login'])
    },
    computed:{
        ...mapState('Article',['loading'])
    }
}
</script>