<template>
  <section class="contact-hero">
    <h1>Kontakt</h1>
    <p>Masz pytania? Skontaktuj się z nami lub wypełnij formularz.</p>
  </section>

  <section class="contact-content">
    <div class="contact-info">
      <n-card>
        <h2>Dane kontaktowe</h2>
        <p><strong>Telefon:</strong> <a :href="`tel:${shelter.phone}`">{{ shelter.phone }}</a></p>
        <p><strong>Email:</strong> <a :href="`mailto:${shelter.email}`">{{ shelter.email }}</a></p>
        <p><strong>Adres:</strong> {{ shelter.address }}</p>
        <p><strong>Godziny otwarcia:</strong> {{ shelter.openHours }}</p>
      </n-card>
      <div class="contact-map" aria-label="Mapa">
        <iframe
          :src="shelter.mapEmbedUrl"
          title="Mapa dojazdu"
          loading="lazy"
        ></iframe>
      </div>
    </div>

    <div class="contact-form">
      <n-card>
        <h2>Formularz kontaktowy</h2>
        <p class="contact-form__hint">Pola oznaczone * są wymagane.</p>
        <n-alert v-if="errorSummary.length" type="error" class="contact-form__error" title="Popraw błędy">
          <ul>
            <li v-for="message in errorSummary" :key="message">{{ message }}</li>
          </ul>
        </n-alert>
        <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
          <n-form-item label="Imię i nazwisko *" path="name">
            <n-input v-model:value="form.name" placeholder="Jan Kowalski" />
          </n-form-item>
          <n-form-item label="Email *" path="email">
            <n-input v-model:value="form.email" placeholder="jan@email.pl" />
          </n-form-item>
          <n-form-item label="Wiadomość *" path="message">
            <n-textarea v-model:value="form.message" placeholder="Napisz wiadomość" />
          </n-form-item>
          <n-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
            Wyślij wiadomość
          </n-button>
        </n-form>
      </n-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { getShelterInfo } from '~/repositories/animalRepository'

const shelter = getShelterInfo()

const formRef = ref<FormInst | null>(null)
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const errorSummary = ref<string[]>([])

const rules: FormRules = {
  name: [{ required: true, message: 'Podaj imię i nazwisko', trigger: ['blur', 'input'] }],
  email: [
    { required: true, message: 'Podaj email', trigger: ['blur', 'input'] },
    { type: 'email', message: 'Podaj poprawny email', trigger: ['blur', 'input'] }
  ],
  message: [{ required: true, message: 'Wpisz wiadomość', trigger: ['blur', 'input'] }]
}

const handleSubmit = async () => {
  errorSummary.value = []
  if (!formRef.value) return

  const isValid = await formRef.value.validate((errors) => {
    if (errors) {
      errorSummary.value = errors.flatMap((group) => group.map((e) => e.message))
    }
  })

  if (isValid) {
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      errorSummary.value = []
    }, 600)
  }
}

useHead({
  title: 'Kontakt',
  meta: [
    {
      name: 'description',
      content: 'Skontaktuj się ze schroniskiem. Jesteśmy dostępni telefonicznie i mailowo.'
    }
  ]
})
</script>
