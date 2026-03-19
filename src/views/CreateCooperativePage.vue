<template>
  <div class="create-page">
    <a href="#" class="back-link" @click.prevent="$router.push('/cooperatives')">← Back</a>

    <div class="form-card">
      <h1 class="page-title">Create New Cooperative</h1>

      <form @submit.prevent="handleCreate">

        <section class="form-section">
          <h2 class="section-title">Basic Information</h2>

          <div class="field full">
            <label class="field-label">Cooperative Name <span class="required">*</span></label>
            <input v-model="form.name" type="text" class="field-input" placeholder="Enter cooperative name" />
            <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
          </div>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Registration Number <span class="required">*</span></label>
              <input v-model="form.registrationNumber" type="text" class="field-input" placeholder="e.g., REG-2024-XXXX-GH" />
              <span v-if="errors.registrationNumber" class="field-error">{{ errors.registrationNumber }}</span>
            </div>
            <div class="field">
              <label class="field-label">Status</label>
              <select v-model="form.status" class="field-input field-select">
                <option value="Active">Active</option>
                <option value="Deactivated">Deactivated</option>
              </select>
            </div>
          </div>

          <div class="field full">
            <label class="field-label">Primary Crops <span class="required">*</span></label>
            <input v-model="form.primaryCrops" type="text" class="field-input" placeholder="e.g., Maize, Beans, Rice" />
            <span v-if="errors.primaryCrops" class="field-error">{{ errors.primaryCrops }}</span>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Location Information</h2>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Region <span class="required">*</span></label>
              <input v-model="form.region" type="text" class="field-input" placeholder="e.g., Eastern Region" />
              <span v-if="errors.region" class="field-error">{{ errors.region }}</span>
            </div>
            <div class="field">
              <label class="field-label">District <span class="required">*</span></label>
              <input v-model="form.district" type="text" class="field-input" placeholder="e.g., Koforidua District" />
              <span v-if="errors.district" class="field-error">{{ errors.district }}</span>
            </div>
          </div>

          <div class="field full">
            <label class="field-label">Physical Address</label>
            <textarea v-model="form.address" class="field-input field-textarea" placeholder="Enter complete physical address" rows="3"></textarea>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Contact Information</h2>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Phone Number <span class="required">*</span></label>
              <input v-model="form.phone" type="tel" class="field-input" placeholder="+233 XX XXX XXXX" />
              <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
            </div>
            <div class="field">
              <label class="field-label">Email Address <span class="required">*</span></label>
              <input v-model="form.email" type="email" class="field-input" placeholder="contact@cooperative.org" />
              <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Leadership Information</h2>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Chairperson Name <span class="required">*</span></label>
              <input v-model="form.chairperson" type="text" class="field-input" placeholder="Enter chairperson's name" />
              <span v-if="errors.chairperson" class="field-error">{{ errors.chairperson }}</span>
            </div>
            <div class="field">
              <label class="field-label">Secretary Name <span class="required">*</span></label>
              <input v-model="form.secretary" type="text" class="field-input" placeholder="Enter secretary's name" />
              <span v-if="errors.secretary" class="field-error">{{ errors.secretary }}</span>
            </div>
          </div>
        </section>

        <section class="form-section last">
          <h2 class="section-title">Financial Information</h2>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Bank Name <span class="required">*</span></label>
              <input v-model="form.bank" type="text" class="field-input" placeholder="e.g., Agricultural Development Bank" />
              <span v-if="errors.bank" class="field-error">{{ errors.bank }}</span>
            </div>
            <div class="field">
              <label class="field-label">Bank Account Number <span class="required">*</span></label>
              <input v-model="form.accountNumber" type="text" class="field-input" placeholder="Enter bank account number" />
              <span v-if="errors.accountNumber" class="field-error">{{ errors.accountNumber }}</span>
            </div>
          </div>
        </section>

        <div class="form-actions">
          <button type="submit" class="btn-create" :disabled="saving">
            <span v-if="saving">🌿 Creating...</span>
            <span v-else>🌿 Create Cooperative</span>
          </button>
          <button type="button" class="btn-cancel" @click="$router.push('/cooperatives')">Cancel</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateCooperativePage',

  data() {
    return {
      saving: false,
      errors: {},
      form: {
        name: '', registrationNumber: '', status: 'Active', primaryCrops: '',
        region: '', district: '', address: '', phone: '', email: '',
        chairperson: '', secretary: '', bank: '', accountNumber: '',
      },
    }
  },

  methods: {
    validate() {
      const e = {}
      if (!this.form.name.trim())               e.name               = 'Cooperative name is required.'
      if (!this.form.registrationNumber.trim()) e.registrationNumber = 'Registration number is required.'
      if (!this.form.primaryCrops.trim())       e.primaryCrops       = 'Primary crops are required.'
      if (!this.form.region.trim())             e.region             = 'Region is required.'
      if (!this.form.district.trim())           e.district           = 'District is required.'
      if (!this.form.phone.trim())              e.phone              = 'Phone number is required.'
      if (!this.form.email.trim())              e.email              = 'Email address is required.'
      if (!this.form.chairperson.trim())        e.chairperson        = 'Chairperson name is required.'
      if (!this.form.secretary.trim())          e.secretary          = 'Secretary name is required.'
      if (!this.form.bank.trim())               e.bank               = 'Bank name is required.'
      if (!this.form.accountNumber.trim())      e.accountNumber      = 'Account number is required.'
      this.errors = e
      return Object.keys(e).length === 0
    },

    async handleCreate() {
      if (!this.validate()) return
      this.saving = true
      try {
        await new Promise((r) => setTimeout(r, 900))
        alert('Cooperative created successfully!')
        this.$router.push('/cooperatives')
      } catch (err) {
        alert('Failed to create cooperative. Please try again.')
      } finally {
        this.saving = false
      }
    },
  },
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.create-page { min-height: 100vh; background-color: #f4f6f8; padding: 24px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }

.back-link { display: inline-block; font-size: 13px; color: #555; text-decoration: none; margin-bottom: 16px; transition: color 0.15s; }
.back-link:hover { color: #1b5e20; }

.form-card { background-color: #ffffff; border: 1px solid #d0e8d2; border-radius: 10px; padding: 28px 32px; max-width: 720px; margin: 0 auto; box-shadow: 0 0 0 2px rgba(67, 160, 71, 0.12); }
.page-title { font-size: 22px; font-weight: 700; color: #1a1a1a; margin-bottom: 24px; }

.form-section { margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid #f0f0f0; }
.form-section.last { border-bottom: none; margin-bottom: 20px; }
.section-title { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }

.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px; }
.field-row:last-child { margin-bottom: 0; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field.full { margin-bottom: 14px; }
.field-label { font-size: 12px; color: #555; font-weight: 500; }
.required { color: #e53935; }

.field-input { height: 40px; border: 1px solid #d0d0d0; border-radius: 6px; padding: 0 12px; font-size: 13px; color: #1a1a1a; background-color: #fafafa; outline: none; width: 100%; transition: border-color 0.2s, background-color 0.2s; font-family: inherit; }
.field-input:focus { border-color: #43a047; background-color: #ffffff; }
.field-input::placeholder { color: #bdbdbd; }
.field-textarea { height: auto; padding: 10px 12px; resize: vertical; line-height: 1.5; }
.field-select { cursor: pointer; appearance: auto; }
.field-error { font-size: 11px; color: #e53935; }

.form-actions { display: flex; align-items: center; gap: 14px; }
.btn-create { background-color: #43a047; color: #ffffff; border: none; padding: 10px 24px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; transition: background-color 0.2s; }
.btn-create:hover:not(:disabled) { background-color: #388e3c; }
.btn-create:disabled { background-color: #a5d6a7; cursor: not-allowed; }
.btn-cancel { background: none; border: none; font-size: 13px; color: #757575; cursor: pointer; font-weight: 500; transition: color 0.15s; }
.btn-cancel:hover { color: #1a1a1a; }

@media (max-width: 560px) {
  .form-card { padding: 20px 16px; }
  .field-row { grid-template-columns: 1fr; }
}
</style>
