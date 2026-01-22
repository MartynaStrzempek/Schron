<template>
  <div class="login">
    <n-card class="login__card" title="Logowanie administratora">
      <p class="login__note">
        To jest tymczasowe logowanie frontend-only. <strong>Do podmiany na prawdziwy backend.</strong>
      </p>
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="top" @submit.prevent="handleLogin">
        <div v-if="hasSubmitErrors" class="form__summary" role="alert">
          Podaj poprawne dane logowania.
        </div>
        <n-form-item label="Email" path="email" required>
          <n-input v-model:value="form.email" placeholder="admin@schronisko.pl" />
        </n-form-item>
        <n-form-item label="Hasło" path="password" required>
          <n-input v-model:value="form.password" type="password" placeholder="••••••" />
        </n-form-item>
        <n-button type="primary" attr-type="submit" :loading="loading" :disabled="loading">
          Zaloguj się
        </n-button>
        <p v-if="errorMessage" class="login__error" role="alert">{{ errorMessage }}</p>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { NButton, NCard, NForm, NFormItem, NInput } from 'naive-ui';

definePageMeta({
  layout: 'admin',
  title: 'Logowanie'
});

const ERROR_MESSAGE = 'Nieprawidłowe dane logowania.';
const formRef = useTemplateRef("formRef");
const loading = ref(false);
const errorMessage = ref('');
const hasSubmitErrors = ref(false);

const form = ref({
  email: '',
  password: ''
});

const rules = {
  email: { required: true, message: 'Email jest wymagany', trigger: ['blur', 'input'] },
  password: { required: true, message: 'Hasło jest wymagane', trigger: ['blur', 'input'] }
};

const handleLogin = async () => {
  hasSubmitErrors.value = false;
  errorMessage.value = '';
  const valid = await formRef.value?.validate().then(() => true).catch(() => false);
  if (!valid) {
    hasSubmitErrors.value = true;
    return;
  }
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    if (form.value.email && form.value.password) {
      // TODO: Placeholder frontend-only auth. Replace with real backend authentication.
      const authCookie = useCookie('admin_auth');
      authCookie.value = 'true';
      navigateTo('/admin');
    } else {
      errorMessage.value = ERROR_MESSAGE;
    }
  }, 600);
};
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;

  &__card {
    width: min(420px, 100%);
  }

  &__note {
    color: $color-gray-500;
  }

  &__error {
    margin-top: $spacing-12;
    color: $color-danger;
  }
}
</style>
