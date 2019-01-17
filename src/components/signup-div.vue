<template>
    <div class="signup-div">
        <h2>signup</h2>
        <form 
            class="form-group" 
            @submit.prevent = "submit">
            <label>username</label>
            <input 
                v-model = "usernameInput" 
                :minlength = "usernameMinLength" 
                type = "text"
                class="form-control"
                required = "true"
            />
            <label>password</label>
            <input 
                v-model = "passwordInput" 
                type = "password" 
                class="form-control"
                required = "true"
                minlength="8"
            />
            <label>confirm password</label>
            <input 
                v-model = "passwordConfirm"
                type = "password"
                class="form-control" 
                required = "true"

            />
            <div 
                v-if = "!isPasswordConfirmValid" 
                class = "alert alert-danger">passwords do not match</div>
            <div class="btn-group">
                <input 
                    :disabled = "!isFormValid" 
                    type="submit"
                    value = "sign up"
                    class="btn btn-success"
                    required = "true"
                />
            </div>
        </form>
        {{ usernameInput }}
        {{ passwordInput }}
        {{ passwordConfirm }}
    </div>
</template>
<script>
export default {
    data () {
        return {
            usernameInput : "",
            passwordInput : "",
            passwordConfirm : "",
            passwordConfirmedChanged : false,
            usernameMinLength : 4
        }
    },
    computed : {
        isPasswordsMatch () {
            return (this.passwordInput == this.passwordConfirm);
        },
        isPasswordValid () {
            return (this.passwordInput.length > 8) && this.isPasswordsMatch;
        },
        isFormValid () {
            return (this.isPasswordValid);
        },
        isPasswordConfirmValid () {
            if (this.passwordConfirmedChanged == false) {
                return true;
            } else {
                return this.isPasswordsMatch;
            }
        }
    },
    watch : {
        passwordConfirm () {
            this.passwordConfirmedChanged = true;
        }
    },
    methods : {
        signup () {

        }
    }
}
</script>
<style lang="scss">
.signup-div {
    .alert {
        padding:0px;
    }
    input:invalid {
    }
}
</style>