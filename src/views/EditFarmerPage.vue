<template>
  <div class="edit-page">
    <a href="#" class="back-link" @click.prevent="$router.back()">← Back</a>

    <div class="form-card">
      <h1 class="page-title">Edit Farmer</h1>

      <form @submit.prevent="handleSave">

        <section class="form-section">
          <h2 class="section-title">Personal Information</h2>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Full Name <span class="required">*</span></label>
              <input v-model="form.fullName" type="text" class="field-input" placeholder="Enter farmer's full name" />
              <span v-if="errors.fullName" class="field-error">{{ errors.fullName }}</span>
            </div>
            <div class="field">
              <label class="field-label">Gender <span class="required">*</span></label>
              <select v-model="form.gender" class="field-input field-select">
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <span v-if="errors.gender" class="field-error">{{ errors.gender }}</span>
            </div>
          </div>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Age</label>
              <input v-model="form.age" type="number" min="0" class="field-input" placeholder="Enter age" />
            </div>
            <div class="field">
              <label class="field-label">Education Level</label>
              <select v-model="form.educationLevel" class="field-input field-select">
                <option value="">Select level</option>
                <option value="No Formal Education">No Formal Education</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Tertiary">Tertiary</option>
              </select>
            </div>
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
              <label class="field-label">Email Address</label>
              <input v-model="form.email" type="email" class="field-input" placeholder="email@example.com" />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Location Information</h2>

          <div class="field-row three-col">
            <div class="field">
              <label class="field-label">Region</label>
              <input v-model="form.region" type="text" class="field-input" placeholder="e.g., Eastern Region" />
            </div>
            <div class="field">
              <label class="field-label">District <span class="required">*</span></label>
              <input v-model="form.district" type="text" class="field-input" placeholder="e.g., Koforidua" />
              <span v-if="errors.district" class="field-error">{{ errors.district }}</span>
            </div>
            <div class="field">
              <label class="field-label">Village/Town</label>
              <input v-model="form.village" type="text" class="field-input" placeholder="e.g., Abosoba" />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Farm Information</h2>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Farm Size (hectares) <span class="required">*</span></label>
              <input v-model="form.farmSize" type="number" min="0" step="0.1" class="field-input" placeholder="e.g., 5.2" />
              <span v-if="errors.farmSize" class="field-error">{{ errors.farmSize }}</span>
            </div>
            <div class="field">
              <label class="field-label">Primary Crops <span class="required">*</span></label>
              <input v-model="form.primaryCrops" type="text" class="field-input" placeholder="e.g., Maize, Cassava" />
              <span v-if="errors.primaryCrops" class="field-error">{{ errors.primaryCrops }}</span>
            </div>
          </div>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Land Ownership</label>
              <select v-model="form.landOwnership" class="field-input field-select">
                <option value="">Select ownership type</option>
                <option value="Owned">Owned</option>
                <option value="Leased">Leased</option>
                <option value="Communal">Communal</option>
              </select>
            </div>
            <div class="field">
              <label class="field-label">Irrigation Access</label>
              <select v-model="form.irrigationAccess" class="field-input field-select">
                <option value="">Select access type</option>
                <option value="Yes - Full">Yes - Full</option>
                <option value="Yes - Partial">Yes - Partial</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-title">Cooperative Membership</h2>

          <div class="field-row">
            <div class="field">
              <label class="field-label">Cooperative <span class="required">*</span></label>
              <input v-model="form.cooperative" type="text" class="field-input" placeholder="Cooperative name" />
              <span v-if="errors.cooperative" class="field-error">{{ errors.cooperative }}</span>
            </div>
            <div class="field">
              <label class="field-label">Membership Status</label>
              <select v-model="form.membershipStatus" class="field-input field-select">
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </section>

        <div class="form-actions">
          <button type="submit" class="btn-save" :disabled="saving">
            <span v-if="saving">💾 Saving...</span>
            <span v-else>💾 Save Changes</span>
          </button>
          <button type="button" class="btn-cancel" @click="$router.back()">Cancel</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditFarmerPage',

  data() {
    return {
      saving: false,
      errors: {},
      form: {
        fullName: '',
        gender: '',
        age: '',
        educationLevel: '',
        phone: '',
        email: '',
        region: '',
        district: '',
        village: '',
        farmSize: '',
        primaryCrops: '',
        landOwnership: '',
        irrigationAccess: '',
        cooperative: '',
        membershipStatus: '',
      },
    }
  },

  methods: {
    validate() {
      const e = {}
      if (!this.form.fullName.trim())     e.fullName     = 'Full name is required.'
      if (!this.form.gender)              e.gender       = 'Gender is required.'
      if (!this.form.phone.trim())        e.phone        = 'Phone number is required.'
      if (!this.form.district.trim())     e.district     = 'District is required.'
      if (!this.form.farmSize)            e.farmSize     = 'Farm size is required.'
      if (!this.form.primaryCrops.trim()) e.primaryCrops = 'Primary crops are required.'
      if (!this.form.cooperative.trim())  e.cooperative  = 'Cooperative is required.'
      this.errors = e
      return Object.keys(e).length === 0
    },

    async handleSave() {
      if (!this.validate()) return
      this.saving = true
      try {
        await new Promise((r) => setTimeout(r, 800))
        alert('Farmer details saved successfully!')
        this.$router.back()
      } catch (err) {
        alert('Failed to save changes. Please try again.')
      } finally {
        this.saving = false
      }
    },
  },
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.edit-page { min-height: 100vh; background-color: #f4f6f8; padding: 24px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.back-link { display: inline-block; font-size: 13px; color: #555; text-decoration: none; margin-bottom: 16px; transition: color 0.15s; }
.back-link:hover { color: #1b5e20; }

.form-card { background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px; padding: 28px 32px; max-width: 720px; margin: 0 auto; }
.page-title { font-size: 22px; font-weight: 700; color: #1a1a1a; margin-bottom: 24px; }

.form-section { margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid #f0f0f0; }
.form-section:last-of-type { border-bottom: none; }
.section-title { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }

.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px; }
.field-row.three-col { grid-template-columns: 1fr 1fr 1fr; }
.field-row:last-child { margin-bottom: 0; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field-label { font-size: 12px; color: #555; font-weight: 500; }
.required { color: #e53935; }

.field-input { height: 40px; border: 1px solid #d0d0d0; border-radius: 6px; padding: 0 12px; font-size: 13px; color: #1a1a1a; background-color: #fafafa; outline: none; transition: border-color 0.2s, background-color 0.2s; width: 100%; }
.field-input:focus { border-color: #43a047; background-color: #ffffff; }
.field-input::placeholder { color: #bdbdbd; }
.field-select { cursor: pointer; appearance: auto; }
.field-error { font-size: 11px; color: #e53935; }

.form-actions { display: flex; align-items: center; gap: 14px; margin-top: 8px; padding-top: 8px; }
.btn-save { background-color: #43a047; color: #ffffff; border: none; padding: 10px 24px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; transition: background-color 0.2s; }
.btn-save:hover:not(:disabled) { background-color: #388e3c; }
.btn-save:disabled { background-color: #a5d6a7; cursor: not-allowed; }
.btn-cancel { background: none; border: none; font-size: 13px; color: #757575; cursor: pointer; font-weight: 500; transition: color 0.15s; }
.btn-cancel:hover { color: #1a1a1a; }

@media (max-width: 600px) {
  .form-card { padding: 20px 16px; }
  .field-row, .field-row.three-col { grid-template-columns: 1fr; }
}
</style>
