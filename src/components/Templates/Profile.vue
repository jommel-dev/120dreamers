<template>
    <q-card class="my-card" square>
        <q-img src="https://wallpapers.com/images/featured/forex-background-we0f1eskslk3m1lp.jpg">
            <div class="absolute-bottom text-subtitle2">
                <q-avatar class="q-pa-xs">
                    <q-icon name="account_circle" />
                </q-avatar>
                {{ fullName }}
            </div>
        </q-img>

        <q-dialog persistent v-model="modalStatus">
            <q-card style="width: 500px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">{{ modalTitle }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 60vh" class="scroll">
                   <q-form ref="passForm" class="q-gutter-md">
                        <q-input 
                            class="q-pt-md" 
                            bottom-slots 
                            v-model="newPassword"
                            v-bind="formRules.matchPass"
                            :type="isPwd ? 'password' : 'text'"
                            label="New Password" 
                            :dense="true"
                        >
                            <template v-slot:prepend>
                                <q-icon name="password" />
                            </template>
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>

                        <q-input 
                            class="q-pt-md" 
                            bottom-slots 
                            v-model="retypePass"
                            v-bind="formRules.matchPass"
                            :type="isPwd ? 'password' : 'text'"
                            label="Re-type Password" 
                            :dense="true"
                        >
                            <template v-slot:prepend>
                                <q-icon name="password" />
                            </template>
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>
                   </q-form>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" :loading="btnLoading" color="negative" @click="cancelChange" />
                    <q-btn flat label="Submit" :loading="btnLoading" color="positive" @click="submitChangePass" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-card>
</template>

<script>
import { LocalStorage, SessionStorage } from 'quasar'
import { defineComponent } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
    name: 'Profile',
    data(){
        return {
            modalStatus: false,
            newPassword:'',
            retypePass: '',
            isPwd: true,
            formRules: {
                matchPass: {
                    rules: [
                        val => !!val || this.$t('validations_error.empty'),
                        val => val == this.newPassword || this.$t('validations_error.invalid_match'),
                    ]
                },
            },
        }
    },
    props: {
        fullName: {
            type: String,
        },
    },
    methods: {
        changePassModal(){
            this.modalStatus = true;
        },
        cancelChange(){
            this.modalStatus = false;
        },
        logout(){
            localStorage.removeItem('userData');
            SessionStorage.remove('userDataLogin');
            this.$router.push('/')
        },
        async submitChangePass(){
            let vm = this;
            let payload = {
                id: this.user.userId,
                newPassword: this.retypePass
            };
            let compoDetails = this.$refs.passForm;

            compoDetails.validate().then(success => {

                if(!success){
                    this.$q.notify({
                        color: 'negative',
                        position: 'top-right',
                        title: 'Incomplete Form',
                        message: 'Please fill the required fields',
                        icon: 'report_problem'
                    })
                    return false;
                } else {
                    // Confirm
                    this.$q.dialog({
                        title: 'Change Password?',
                        message: 'Are you sure you want to change your password?',
                        ok: {
                            label: 'Yes'
                        },
                        cancel: {
                            label: 'No',
                            color: 'negative'
                        },
                        persistent: true
                    }).onOk(() => {
                        this.$q.loading.show({
                            message: 'Changing your password. Please wait...'
                        });

                        api.post('auth/changePassword', payload).then((response) => {
              
                            const data = {...response.data};
                            if(!data.error){
                                LocalStorage.remove('userData');
                                vm.$router.push('/')
                            } else {
                                vm.$q.notify({
                                    color: 'negative',
                                    position: 'top-right',
                                    title:data.title,
                                    message: vm.$t(`errors.${data.error}`),
                                    icon: 'report_problem'
                                })
                            }
                        })

                        this.$q.loading.hide();

                    })
                }
            })
            
           

        }
    }
})
</script>
