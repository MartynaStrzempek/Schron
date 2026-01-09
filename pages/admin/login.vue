<template>
  <section class="admin-login">
    <n-card class="admin-login__card">
      <h1>Logowanie administratora</h1>
      <p>Użyj danych demo, aby wejść do panelu administracyjnego.</p>
      <p class="admin-login__hint">Email: admin@schronisko.pl, hasło: haslo123</p>
      <n-alert v-if="error" type="error" title="Błąd logowania" class="admin-login__error">
        {{ error }}
      </n-alert>
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
        <n-form-item label="Email *" path="email">
          <n-input v-model:value="form.email" placeholder="admin@schronisko.pl" />
        </n-form-item>
        <n-form-item label="Hasło *" path="password">
          <n-input v-model:value="form.password" type="password" placeholder="••••••" />
        </n-form-item>
        <n-button type="primary" :loading="submitting" :disabled="submitting" @click="handleLogin">
          Zaloguj
        </n-button>
      </n-form>
    </n-card>
  </section>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'

definePageMeta({
  layout: 'default'
})

const formRef = ref<FormInst | null>(null)
const form = reactive({
  email: '',
  password: ''
})

const submitting = ref(false)
const error = ref('')

const rules: FormRules = {
  email: [{ required: true, message: 'Podaj email', trigger: ['blur', 'input'] }],
  password: [{ required: true, message: 'Podaj hasło', trigger: ['blur', 'input'] }]
}

const handleLogin = async () => {
  error.value = ''
  if (!formRef.value) return

  const isValid = await formRef.value.validate()
  if (!isValid) return

  submitting.value = true

  setTimeout(() => {
    // Placeholder: w prawdziwej aplikacji logowanie byłoby obsługiwane przez backend.
    if (form.email !== 'admin@schronisko.pl' || form.password !== 'haslo123') {
      error.value = 'Nieprawidłowe dane logowania.'
      submitting.value = false
      return
    }
    const adminSession = useCookie('admin_session', { maxAge: 60 * 60 * 8 })
    adminSession.value = 'logged_in'
    submitting.value = false
    navigateTo('/admin')
  }, 500)
}

useHead({
  title: 'Logowanie admina'
})
</script>
