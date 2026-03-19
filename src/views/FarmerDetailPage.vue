<template>
  <div class="detail-page">
    <a href="#" class="back-link" @click.prevent="$router.back()">← Back</a>

    <div class="detail-card">

      <div class="farmer-header">
        <div class="farmer-identity">
          <div class="farmer-avatar">
            <img v-if="farmer.avatarUrl" :src="farmer.avatarUrl" :alt="farmer.name" class="avatar-img" />
            <span v-else class="avatar-initials">{{ initials }}</span>
          </div>
          <div class="farmer-meta">
            <h1 class="farmer-name">{{ farmer.name }}</h1>
            <p class="farmer-id">Farmer ID: {{ farmer.id }}</p>
            <div class="farmer-badges">
              <span class="badge-active">● Active</span>
              <span class="joined">📅 Joined {{ farmer.joined }}</span>
            </div>
          </div>
        </div>
        <button class="btn-edit" @click="$router.push('/farmers/' + farmer.id + '/edit')">✏️ Edit Farmer</button>
      </div>

      <div class="info-top-grid">
        <div class="info-block">
          <h3 class="info-block-title">Contact Information</h3>
          <div class="info-item">
            <span class="info-icon">📞</span>
            <div><span class="info-sublabel">Phone</span><span class="info-val">{{ farmer.phone }}</span></div>
          </div>
          <div class="info-item">
            <span class="info-icon">✉️</span>
            <div><span class="info-sublabel">Email</span><span class="info-val">{{ farmer.email }}</span></div>
          </div>
          <div class="info-item">
            <span class="info-icon">📍</span>
            <div><span class="info-sublabel">Location</span><span class="info-val">{{ farmer.location }}</span></div>
          </div>
        </div>

        <div class="info-block">
          <h3 class="info-block-title">Personal Information</h3>
          <div class="info-field"><span class="info-sublabel">Gender</span><span class="info-val">{{ farmer.gender }}</span></div>
          <div class="info-field"><span class="info-sublabel">Age</span><span class="info-val">{{ farmer.age }} years</span></div>
          <div class="info-field"><span class="info-sublabel">Education</span><span class="info-val">{{ farmer.education }}</span></div>
          <div class="info-field"><span class="info-sublabel">Farming Experience</span><span class="info-val">{{ farmer.farmingExperience }}</span></div>
        </div>

        <div class="info-block">
          <h3 class="info-block-title">Cooperative Membership</h3>
          <div class="info-field"><span class="info-sublabel">Cooperative</span><span class="info-val cooperative-name">{{ farmer.cooperative }}</span></div>
          <div class="info-field"><span class="info-sublabel">Member Since</span><span class="info-val">{{ farmer.memberSince }}</span></div>
          <div class="info-field"><span class="info-sublabel">Membership Status</span><span class="info-val">{{ farmer.membershipStatus }}</span></div>
        </div>
      </div>

      <div class="cards-grid">
        <div class="data-card">
          <h3 class="data-card-title">🌾 Farm Details</h3>
          <div class="data-row">
            <div class="data-field"><span class="data-label">Farm Size</span><span class="data-val">{{ farmer.farmSize }}</span></div>
            <div class="data-field"><span class="data-label">Primary Crops</span><span class="data-val">{{ farmer.primaryCrops }}</span></div>
          </div>
          <div class="data-row">
            <div class="data-field"><span class="data-label">Land Ownership</span><span class="data-val">{{ farmer.landOwnership }}</span></div>
            <div class="data-field"><span class="data-label">Growing Season</span><span class="data-val">{{ farmer.growingSeason }}</span></div>
          </div>
          <div class="data-row">
            <div class="data-field">
              <span class="data-label">Irrigation Access</span>
              <span class="data-val irrigation" :class="farmer.irrigationAccess === 'No' ? 'no' : 'yes'">{{ farmer.irrigationAccess }}</span>
            </div>
          </div>
        </div>

        <div class="data-card">
          <h3 class="data-card-title">📈 Production Data</h3>
          <div class="data-row"><div class="data-field"><span class="data-label">Last Harvest Yield</span><span class="data-val highlight">{{ farmer.lastHarvestYield }}</span></div></div>
          <div class="data-row"><div class="data-field"><span class="data-label">Yield per Hectare</span><span class="data-val highlight">{{ farmer.yieldPerHectare }}</span></div></div>
          <div class="data-row"><div class="data-field"><span class="data-label">Growing Season</span><span class="data-val">{{ farmer.growingSeasonCount }}</span></div></div>
          <div class="data-row"><div class="data-field"><span class="data-label">Next Planting Date</span><span class="data-val">{{ farmer.nextPlantingDate }}</span></div></div>
        </div>
      </div>

      <div class="activity-section">
        <h3 class="activity-title">🕐 Recent Activity</h3>
        <div v-for="(activity, index) in farmer.recentActivity" :key="index" class="activity-item">
          <span class="activity-dot"></span>
          <p class="activity-text">{{ activity }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FarmerDetailPage',

  data() {
    return {
      farmer: {
        id: 'FRM-002',
        name: 'Abena Osei',
        avatarUrl: 'https://i.pravatar.cc/80?img=47',
        joined: 'July 21, 2019',
        status: 'Active',
        phone: '+233 20 987 8543',
        email: 'abenaosei@gmail.com',
        location: 'Adaagyiri, Nsawam Eastern Region',
        gender: 'Female',
        age: 38,
        education: 'Primary',
        farmingExperience: '15 years',
        cooperative: 'Green Valley Farmers Association',
        memberSince: 'July 2019',
        membershipStatus: 'Active',
        farmSize: '3.8 hectares',
        primaryCrops: 'Beans, Groundnuts',
        landOwnership: 'Leased',
        growingSeason: '2 per year',
        irrigationAccess: 'No',
        lastHarvestYield: '8.3 tons',
        yieldPerHectare: '2.4 tons/ha',
        growingSeasonCount: '2 per year',
        nextPlantingDate: 'April 2026',
        recentActivity: [
          'Kwame Mensah attended a training session on "Sustainable Farming Practices" on February 10, 2025.',
        ],
      },
    }
  },

  computed: {
    initials() {
      return this.farmer.name.split(' ').map((n) => n[0]).join('').toUpperCase()
    },
  },
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.detail-page { min-height: 100vh; background-color: #f4f6f8; padding: 24px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.back-link { display: inline-block; font-size: 13px; color: #555; text-decoration: none; margin-bottom: 16px; transition: color 0.15s; }
.back-link:hover { color: #1b5e20; }

.detail-card { background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px; padding: 28px 32px; max-width: 820px; margin: 0 auto; }

.farmer-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0; }
.farmer-identity { display: flex; align-items: center; gap: 16px; }
.farmer-avatar { width: 72px; height: 72px; border-radius: 50%; overflow: hidden; background-color: #c8e6c9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.avatar-img { width: 100%; height: 100%; object-fit: cover; }
.avatar-initials { font-size: 22px; font-weight: 700; color: #2e7d32; }
.farmer-name { font-size: 20px; font-weight: 700; color: #1a1a1a; }
.farmer-id { font-size: 12px; color: #9e9e9e; margin: 3px 0 8px; }
.farmer-badges { display: flex; align-items: center; gap: 16px; }
.badge-active { font-size: 12px; font-weight: 600; color: #2e7d32; background-color: #e8f5e9; padding: 3px 10px; border-radius: 20px; }
.joined { font-size: 12px; color: #757575; }
.btn-edit { background-color: #e8f5e9; color: #2e7d32; border: 1.5px solid #a5d6a7; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background-color 0.2s; white-space: nowrap; }
.btn-edit:hover { background-color: #c8e6c9; }

.info-top-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px; }
.info-block { background-color: #fafafa; border: 1px solid #f0f0f0; border-radius: 8px; padding: 16px; }
.info-block-title { font-size: 12px; font-weight: 700; color: #555; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
.info-item { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 10px; }
.info-item:last-child { margin-bottom: 0; }
.info-icon { font-size: 14px; margin-top: 2px; }
.info-field { margin-bottom: 10px; }
.info-field:last-child { margin-bottom: 0; }
.info-sublabel { display: block; font-size: 10px; color: #9e9e9e; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 1px; }
.info-val { display: block; font-size: 13px; color: #1a1a1a; font-weight: 500; }
.cooperative-name { color: #2e7d32; font-weight: 600; }

.cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.data-card { background-color: #fafafa; border: 1px solid #f0f0f0; border-radius: 8px; padding: 16px; }
.data-card-title { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid #eeeeee; }
.data-row { display: flex; gap: 16px; margin-bottom: 12px; }
.data-row:last-child { margin-bottom: 0; }
.data-field { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.data-label { font-size: 10px; color: #9e9e9e; text-transform: uppercase; letter-spacing: 0.4px; }
.data-val { font-size: 13px; color: #1a1a1a; font-weight: 500; }
.data-val.highlight { font-size: 15px; font-weight: 700; color: #1b5e20; }
.data-val.irrigation.no { color: #e53935; font-weight: 600; }
.data-val.irrigation.yes { color: #2e7d32; font-weight: 600; }

.activity-section { background-color: #f1f8e9; border: 1px solid #dcedc8; border-radius: 8px; padding: 16px 20px; }
.activity-title { font-size: 13px; font-weight: 700; color: #33691e; margin-bottom: 12px; }
.activity-item { display: flex; align-items: flex-start; gap: 10px; }
.activity-dot { width: 8px; height: 8px; border-radius: 50%; background-color: #43a047; flex-shrink: 0; margin-top: 5px; }
.activity-text { font-size: 13px; color: #33691e; line-height: 1.5; }

@media (max-width: 680px) {
  .detail-card { padding: 20px 16px; }
  .info-top-grid { grid-template-columns: 1fr; }
  .cards-grid { grid-template-columns: 1fr; }
  .farmer-header { flex-direction: column; gap: 14px; }
}
</style>
