<template>
  <n-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-placement="top"
    class="contact-form"
    @submit.prevent="handleSubmit"
  >
    <div v-if="hasSubmitErrors" class="form__summary" role="alert">
      Uzupełnij wymagane pola, aby wysłać wiadomość.
    </div>
    <n-form-item label="Imię i nazwisko" path="name" required>
      <n-input v-model:value="form.name" placeholder="Wpisz swoje imię" />
    </n-form-item>
    <n-form-item label="Email" path="email" required>
      <n-input v-model:value="form.email" type="email" placeholder="twoj@email.pl" />
    </n-form-item>
    <n-form-item label="Wiadomość" path="message" required>
      <n-input v-model:value="form.message" type="textarea" placeholder="Napisz wiadomość" />
    </n-form-item>
    <n-button type="primary" attr-type="submit" :loading="submitting" :disabled="submitting">
      Wyślij wiadomość
    </n-button>
    <p v-if="successMessage" class="contact-form__success" role="status">{{ successMessage }}</p>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NForm, NFormItem, NInput } from 'naive-ui';

const formRef = ref<InstanceType<typeof NForm> | null>(null);
const submitting = ref(false);
const successMessage = ref('');
const hasSubmitErrors = ref(false);

const form = ref({
  name: '',
  email: '',
  message: ''
});

const rules = {
  name: {
    required: true,
    message: 'Imię jest wymagane',
    trigger: ['blur', 'input']
  },
  email: {
    required: true,
    message: 'Email jest wymagany',
    trigger: ['blur', 'input']
  },
  message: {
    required: true,
    message: 'Wiadomość jest wymagana',
    trigger: ['blur', 'input']
  }
};

const handleSubmit = async () => {
  hasSubmitErrors.value = false;
  successMessage.value = '';
  const valid = await formRef.value?.validate().then(() => true).catch(() => false);
  if (!valid) {
    hasSubmitErrors.value = true;
    return;
  }
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    successMessage.value = 'Dziękujemy za wiadomość. Skontaktujemy się wkrótce.';
    form.value = { name: '', email: '', message: '' };
  }, 800);
};
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.contact-form {
  background: $color-white;
  padding: $spacing-24;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  &__success {
    margin-top: $spacing-16;
    color: $color-success;
  }
}
</style>
