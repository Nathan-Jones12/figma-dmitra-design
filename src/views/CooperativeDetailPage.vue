<template>
  <div class="detail-page">
    <!-- Back Navigation -->
    <a href="#" class="back-link" @click.prevent="$router.push('/cooperatives')">
      ← Back to Cooperatives
    </a>

    <!-- Hero Banner -->
    <div class="hero-banner">
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop"
        alt="Farm field"
        class="hero-image"
      />
      <div class="hero-overlay">
        <h1 class="hero-title">{{ cooperative.name }}</h1>
        <p class="hero-subtitle">Cooperative ID: {{ cooperative.id }}</p>
      </div>
    </div>

    <!-- Status Bar -->
    <div class="status-bar">
      <div class="status-left">
        <span class="status-badge active">● Active</span>
        <span class="established">📅 Established {{ cooperative.established }}</span>
      </div>
      <button class="btn-edit" @click="$router.push('/cooperatives/' + cooperative.id + '/edit')">
        ✏️ Edit Cooperative
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-icon blue">👥</span>
        <div class="stat-info">
          <span class="stat-label">Total Members</span>
          <span class="stat-value">{{ cooperative.totalMembers }}</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon green">🌿</span>
        <div class="stat-info">
          <span class="stat-label">Total Land Area</span>
          <span class="stat-value">{{ cooperative.totalLandArea }}</span>
          <span class="stat-unit">hectares</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon orange">📈</span>
        <div class="stat-info">
          <span class="stat-label">Average Yield</span>
          <span class="stat-value">{{ cooperative.averageYield }}</span>
          <span class="stat-unit">tons/harvest</span>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon purple">🧑‍🌾</span>
        <div class="stat-info">
          <span class="stat-label">Active Farmers</span>
          <span class="stat-value">{{ cooperative.activeFarmers }}</span>
        </div>
      </div>
    </div>

    <!-- Info Sections -->
    <div class="info-grid">
      <div class="info-section">
        <h2 class="section-title">Basic Information</h2>
        <div class="info-row"><span class="info-label">Registration Number</span><span class="info-value">{{ cooperative.registrationNumber }}</span></div>
        <div class="info-row"><span class="info-label">Region</span><span class="info-value">{{ cooperative.region }}</span></div>
        <div class="info-row"><span class="info-label">District</span><span class="info-value">{{ cooperative.district }}</span></div>
        <div class="info-row"><span class="info-label">Primary Crops</span><span class="info-value">{{ cooperative.primaryCrops }}</span></div>
      </div>

      <div class="info-section">
        <h2 class="section-title">Contact Information</h2>
        <div class="info-row"><span class="info-label">Address</span><span class="info-value">{{ cooperative.address }}</span></div>
        <div class="info-row"><span class="info-label">Phone</span><span class="info-value">{{ cooperative.phone }}</span></div>
        <div class="info-row"><span class="info-label">Email</span><span class="info-value">{{ cooperative.email }}</span></div>
      </div>

      <div class="info-section">
        <h2 class="section-title">Leadership</h2>
        <div class="info-row"><span class="info-label">Chairperson</span><span class="info-value">{{ cooperative.chairperson }}</span></div>
        <div class="info-row"><span class="info-label">Secretary</span><span class="info-value">{{ cooperative.secretary }}</span></div>
      </div>

      <div class="info-section">
        <h2 class="section-title">Financial Information</h2>
        <div class="info-row"><span class="info-label">Bank</span><span class="info-value">{{ cooperative.bank }}</span></div>
        <div class="info-row"><span class="info-label">Account Number</span><span class="info-value">{{ cooperative.accountNumber }}</span></div>
      </div>
    </div>

    <!-- Members Table -->
    <div class="members-section">
      <h2 class="section-title">Members ({{ cooperative.members.length }})</h2>
      <div class="table-wrapper">
        <table class="members-table">
          <thead>
            <tr>
              <th>Farmer ID</th>
              <th>Name</th>
              <th>Farm Size</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in cooperative.members" :key="member.id">
              <td>{{ member.id }}</td>
              <td>{{ member.name }}</td>
              <td>{{ member.farmSize }}</td>
              <td>
                <span
                  class="member-status"
                  :class="{
                    'status-active': member.status === 'Active',
                    'status-pending': member.status === 'Pending',
                    'status-inactive': member.status === 'Inactive',
                  }"
                >{{ member.status }}</span>
              </td>
              <td>
                <button class="btn-view" @click="$router.push('/farmers/' + member.id)">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CooperativeDetailPage',

  data() {
    return {
      cooperative: {
        id: 'COOP-001',
        name: 'Green Valley Farmers Association',
        established: 'March 14, 2010',
        status: 'Active',
        totalMembers: 245,
        totalLandArea: '1,240',
        averageYield: '15.8',
        activeFarmers: 3,
        registrationNumber: 'REG-2019-0315-GH',
        region: 'Eastern Region',
        district: 'Koforidua District',
        primaryCrops: 'Maize, Beans',
        address: 'Plot 45, Abosaba Road, Koforidua',
        phone: '+233 24 555 0001',
        email: 'info@greenvalley.coop',
        chairperson: 'Kwabena Frimpong',
        secretary: 'Beatrice Asare',
        bank: 'Agricultural Development Bank',
        accountNumber: 'ACC-1234567890',
        members: [
          { id: 'FRM-001', name: 'Kwame Mensah',   farmSize: '6.2 hectares', status: 'Active'   },
          { id: 'FRM-002', name: 'Abena Osei',     farmSize: '3.8 hectares', status: 'Active'   },
          { id: 'FRM-003', name: 'Akosua Boateng', farmSize: '2.3 hectares', status: 'Pending'  },
          { id: 'FRM-004', name: 'Ama Kyei',       farmSize: '0.0 hectares', status: 'Active'   },
        ],
      },
    }
  },
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.detail-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 20px 24px 48px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
}

.back-link { display: inline-block; font-size: 13px; color: #555; text-decoration: none; margin-bottom: 14px; transition: color 0.15s; }
.back-link:hover { color: #1b5e20; }

.hero-banner { position: relative; border-radius: 10px; overflow: hidden; height: 160px; margin-bottom: 16px; }
.hero-image { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 24px; background: linear-gradient(to top, rgba(0,0,0,0.65), transparent); }
.hero-title { font-size: 22px; font-weight: 700; color: #ffffff; }
.hero-subtitle { font-size: 13px; color: rgba(255,255,255,0.8); margin-top: 4px; }

.status-bar { display: flex; align-items: center; justify-content: space-between; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px 20px; margin-bottom: 16px; }
.status-left { display: flex; align-items: center; gap: 20px; }
.status-badge.active { font-size: 13px; font-weight: 600; color: #2e7d32; background-color: #e8f5e9; padding: 4px 12px; border-radius: 20px; }
.established { font-size: 13px; color: #757575; }
.btn-edit { background-color: #e8f5e9; color: #2e7d32; border: 1.5px solid #a5d6a7; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background-color 0.2s; }
.btn-edit:hover { background-color: #c8e6c9; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.stat-card { background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; display: flex; align-items: flex-start; gap: 12px; }
.stat-icon { font-size: 22px; padding: 8px; border-radius: 8px; }
.stat-icon.blue { background-color: #e3f2fd; }
.stat-icon.green { background-color: #e8f5e9; }
.stat-icon.orange { background-color: #fff3e0; }
.stat-icon.purple { background-color: #f3e5f5; }
.stat-info { display: flex; flex-direction: column; }
.stat-label { font-size: 11px; color: #9e9e9e; text-transform: uppercase; letter-spacing: 0.4px; }
.stat-value { font-size: 20px; font-weight: 700; color: #1a1a1a; line-height: 1.2; }
.stat-unit { font-size: 11px; color: #9e9e9e; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
.info-section { background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 18px 20px; }
.section-title { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0; }
.info-row { display: flex; flex-direction: column; margin-bottom: 12px; }
.info-row:last-child { margin-bottom: 0; }
.info-label { font-size: 11px; color: #9e9e9e; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 2px; }
.info-value { font-size: 13px; color: #333; font-weight: 500; }

.members-section { background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 18px 20px; }
.members-section .section-title { margin-bottom: 14px; }
.table-wrapper { overflow-x: auto; }
.members-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.members-table thead tr { background-color: #1b5e20; }
.members-table thead th { color: #ffffff; padding: 10px 14px; text-align: left; font-weight: 600; font-size: 12px; letter-spacing: 0.3px; }
.members-table tbody tr { border-bottom: 1px solid #f0f0f0; transition: background-color 0.15s; }
.members-table tbody tr:last-child { border-bottom: none; }
.members-table tbody tr:hover { background-color: #f9fbe9; }
.members-table tbody td { padding: 10px 14px; color: #333; }
.member-status { font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 20px; }
.status-active { background-color: #e8f5e9; color: #2e7d32; }
.status-pending { background-color: #fff8e1; color: #f57f17; }
.status-inactive { background-color: #ffebee; color: #c62828; }
.btn-view { background: none; border: none; color: #43a047; font-size: 13px; font-weight: 600; cursor: pointer; padding: 0; text-decoration: underline; transition: color 0.15s; }
.btn-view:hover { color: #1b5e20; }

@media (max-width: 640px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .info-grid { grid-template-columns: 1fr; }
  .status-bar { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>
