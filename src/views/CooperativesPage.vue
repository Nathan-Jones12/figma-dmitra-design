<template>
  <div class="app-layout">
    <!-- ===== SIDEBAR ===== -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <span class="logo-icon">🌿</span>
        <span class="logo-text">DIMITRA</span>
      </div>

      <nav class="sidebar-nav">
        <a
          v-for="item in navItems"
          :key="item.label"
          href="#"
          class="nav-item"
          :class="{ active: item.active }"
          @click.prevent="setActive(item)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.hasChevron" class="nav-chevron">›</span>
        </a>
      </nav>
    </aside>

    <!-- ===== MAIN CONTENT ===== -->
    <div class="main-wrapper">
      <!-- Top Bar -->
      <header class="topbar">
        <button class="menu-toggle">☰</button>
        <div class="topbar-right">
          <button class="icon-btn">⚙️</button>
          <button class="icon-btn">🔔</button>
          <div class="user-info">
            <div class="user-avatar">JD</div>
            <div class="user-details">
              <span class="user-name">John Doe</span>
              <span class="user-email">johndoe@example.com</span>
            </div>
            <span class="user-chevron">▾</span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="page-content">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <span>Dashboard</span>
          <span class="breadcrumb-sep">›</span>
          <span class="breadcrumb-current">Cooperatives</span>
        </div>

        <!-- Page Header -->
        <div class="page-header">
          <h1 class="page-title">Cooperatives</h1>
          <button class="btn-create" @click="$router.push('/cooperatives/create')">+ CREATE COOPERATIVE</button>
        </div>

        <p class="page-description">Manage and view all agricultural cooperatives</p>

        <!-- Toolbar -->
        <div class="toolbar">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search"
              class="search-input"
            />
          </div>
          <div class="toolbar-right">
            <button class="btn-export" @click="exportCSV">
              📤 EXPORT AS CSV
            </button>
            <div class="filter-group">
              <span class="filter-label">Filter By</span>
              <button class="btn-filter">▼</button>
              <span class="pagination-info">{{ paginationStart }}-{{ paginationEnd }} of {{ totalItems }}</span>
              <button class="btn-page" @click="prevPage" :disabled="currentPage === 1">‹</button>
              <button class="btn-page" @click="nextPage" :disabled="currentPage === totalPages">›</button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th @click="sortBy('id')">Cooperative ID <span class="sort-icon">⇅</span></th>
                <th @click="sortBy('name')">Name <span class="sort-icon">⇅</span></th>
                <th @click="sortBy('region')">Region <span class="sort-icon">⇅</span></th>
                <th @click="sortBy('members')">No. of Members <span class="sort-icon">⇅</span></th>
                <th @click="sortBy('crops')">Primary Crops <span class="sort-icon">⇅</span></th>
                <th @click="sortBy('status')">Status <span class="sort-icon">⇅</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in paginatedRows"
                :key="row.id"
                :class="{ 'row-highlight': hoveredRow === index }"
                @mouseenter="hoveredRow = index"
                @mouseleave="hoveredRow = null"
              >
                <td>{{ row.id }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.region }}</td>
                <td>{{ row.members }}</td>
                <td>{{ row.crops }}</td>
                <td>
                  <div class="row-status-cell">
                    <span
                      v-if="hoveredRow !== index"
                      class="status-badge"
                      :class="row.status === 'Active' ? 'status-active' : 'status-deactivated'"
                    >
                      {{ row.status }}
                    </span>
                    <div v-else class="row-actions">
                      <button class="action-btn view" title="View" @click="$router.push('/cooperatives/' + row.id)">👁️</button>
                      <button class="action-btn edit" title="Edit" @click="$router.push('/cooperatives/' + row.id + '/edit')">✏️</button>
                      <button class="action-btn assign" title="Assign">👤</button>
                      <button class="action-btn delete" title="Delete">🗑️</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary Stats -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-info">
              <span class="stat-label">Total Cooperatives</span>
              <span class="stat-value">{{ stats.totalCooperatives }}</span>
            </div>
            <span class="stat-icon">🏢</span>
          </div>
          <div class="stat-card">
            <div class="stat-info">
              <span class="stat-label">Total Members</span>
              <span class="stat-value">{{ stats.totalMembers }}</span>
            </div>
            <span class="stat-icon">👥</span>
          </div>
          <div class="stat-card">
            <div class="stat-info">
              <span class="stat-label">Active Status</span>
              <span class="stat-value">{{ stats.activeStatus }}</span>
            </div>
            <span class="stat-icon trend-up">📈</span>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CooperativesPage',

  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      rowsPerPage: 10,
      sortKey: '',
      sortOrder: 'asc',
      hoveredRow: null,

      navItems: [
        { label: 'Dashboard', icon: '🏠', active: false },
        { label: 'Cooperatives', icon: '🤝', active: true },
        { label: 'Admin Roles', icon: '🛡️', active: false },
        { label: 'Membership Plan', icon: '📋', active: false },
        { label: 'Permissions', icon: '🔑', active: false },
        { label: 'Activation Keys', icon: '🗝️', active: false },
        { label: 'Crops Overview', icon: '🌾', active: false, hasChevron: true },
        { label: 'Survey Builder', icon: '📝', active: false },
        { label: 'Role Requests', icon: '📨', active: false },
        { label: 'Tickets', icon: '🎫', active: false },
        { label: 'Payments', icon: '💳', active: false },
        { label: 'Activity Log', icon: '📊', active: false },
        { label: 'Settings', icon: '⚙️', active: false },
      ],

      cooperatives: [
        { id: 'COOP-001', name: 'Sunrise Agricultural Cooperative', region: 'Eastern Region', members: 556, crops: 'Maize, Beans', status: 'Active' },
        { id: 'COOP-002', name: 'Green Valley Farmers Association', region: 'Western Region', members: 554, crops: 'Coffee, Cacao', status: 'Deactivated' },
        { id: 'COOP-003', name: 'Coastal Farmers Union', region: 'Northern Region', members: 888, crops: 'Tea, Coffee', status: 'Active' },
        { id: 'COOP-004', name: 'Highland Coffee Growers', region: 'Eastern Region', members: 233, crops: 'Wheat, Barley', status: 'Active' },
        { id: 'COOP-005', name: 'Western Organic Collective', region: 'Central Region', members: 5, crops: 'Corn', status: 'Active' },
        { id: 'COOP-006', name: 'Northern Organic Collective', region: 'South Region', members: 335, crops: 'Coffee, Cacao', status: 'Deactivated' },
        { id: 'COOP-007', name: 'Lowland Tea Growers', region: 'South Region', members: 67, crops: 'Maize, Beans', status: 'Active' },
        { id: 'COOP-008', name: 'Coastal Cooperative', region: 'Eastern Region', members: 356, crops: 'Wheat', status: 'Deactivated' },
      ],

      stats: {
        totalCooperatives: 5,
        totalMembers: 884,
        activeStatus: 4,
      },
    }
  },

  computed: {
    filteredRows() {
      const q = this.searchQuery.toLowerCase()
      let rows = this.cooperatives.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q) ||
          r.crops.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q)
      )
      if (this.sortKey) {
        rows = [...rows].sort((a, b) => {
          const valA = a[this.sortKey]
          const valB = b[this.sortKey]
          if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1
          if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1
          return 0
        })
      }
      return rows
    },

    totalItems() { return this.filteredRows.length },
    totalPages() { return Math.ceil(this.totalItems / this.rowsPerPage) },
    paginationStart() { return (this.currentPage - 1) * this.rowsPerPage + 1 },
    paginationEnd() { return Math.min(this.currentPage * this.rowsPerPage, this.totalItems) },
    paginatedRows() {
      const start = (this.currentPage - 1) * this.rowsPerPage
      return this.filteredRows.slice(start, start + this.rowsPerPage)
    },
  },

  methods: {
    setActive(item) {
      this.navItems.forEach((n) => (n.active = false))
      item.active = true
    },

    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }
    },

    prevPage() { if (this.currentPage > 1) this.currentPage-- },
    nextPage() { if (this.currentPage < this.totalPages) this.currentPage++ },

    exportCSV() {
      const headers = ['Cooperative ID', 'Name', 'Region', 'No. of Members', 'Primary Crops', 'Status']
      const rows = this.filteredRows.map((r) =>
        [r.id, r.name, r.region, r.members, r.crops, r.status].join(',')
      )
      const csv = [headers.join(','), ...rows].join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'cooperatives.csv'
      a.click()
      URL.revokeObjectURL(url)
    },
  },
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.app-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* ---------- Sidebar ---------- */
.sidebar {
  width: 220px;
  min-width: 220px;
  background-color: #1b5e20;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  overflow-y: auto;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 20px 24px;
}

.logo-icon { font-size: 18px; }

.logo-text {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ffffff;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  text-decoration: none;
  color: rgba(255,255,255,0.75);
  font-size: 13px;
  font-weight: 500;
  transition: background-color 0.15s, color 0.15s;
  position: relative;
}

.nav-item:hover { background-color: rgba(255,255,255,0.1); color: #ffffff; }
.nav-item.active { background-color: rgba(255,255,255,0.15); color: #ffffff; font-weight: 600; }

.nav-icon { font-size: 15px; width: 20px; text-align: center; }
.nav-label { flex: 1; }
.nav-chevron { font-size: 16px; opacity: 0.6; }

/* ---------- Main Wrapper ---------- */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f4f6f8;
  min-width: 0;
}

/* ---------- Topbar ---------- */
.topbar {
  height: 56px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #555;
}

.topbar-right { display: flex; align-items: center; gap: 12px; }

.icon-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  opacity: 0.7;
  transition: opacity 0.15s;
}

.icon-btn:hover { opacity: 1; }

.user-info { display: flex; align-items: center; gap: 8px; cursor: pointer; }

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #43a047;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-details { display: flex; flex-direction: column; }
.user-name { font-size: 13px; font-weight: 600; color: #1a1a1a; }
.user-email { font-size: 11px; color: #9e9e9e; }
.user-chevron { font-size: 12px; color: #9e9e9e; }

/* ---------- Page Content ---------- */
.page-content { padding: 24px; overflow-y: auto; }

/* ---------- Breadcrumb ---------- */
.breadcrumb { font-size: 12px; color: #9e9e9e; margin-bottom: 12px; }
.breadcrumb-sep { margin: 0 6px; }
.breadcrumb-current { color: #555; }

/* ---------- Page Header ---------- */
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }

.page-title { font-size: 24px; font-weight: 700; color: #1a1a1a; }

.btn-create {
  background-color: #43a047;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-create:hover { background-color: #388e3c; }

.page-description { font-size: 13px; color: #757575; margin-bottom: 20px; }

/* ---------- Toolbar ---------- */
.toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; gap: 12px; }

.search-box {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0 12px;
  height: 38px;
  min-width: 240px;
}

.search-icon { font-size: 14px; margin-right: 8px; opacity: 0.5; }

.search-input { border: none; outline: none; font-size: 13px; color: #333; width: 100%; background: transparent; }

.toolbar-right { display: flex; align-items: center; gap: 12px; }

.btn-export {
  background-color: #ffffff;
  border: 1.5px solid #43a047;
  color: #43a047;
  padding: 7px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-export:hover { background-color: #f1f8f1; }

.filter-group { display: flex; align-items: center; gap: 8px; }
.filter-label { font-size: 13px; color: #555; }

.btn-filter {
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
}

.pagination-info { font-size: 12px; color: #555; }

.btn-page {
  width: 28px;
  height: 28px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s;
}

.btn-page:hover:not(:disabled) { background-color: #f1f8f1; border-color: #43a047; }
.btn-page:disabled { opacity: 0.4; cursor: not-allowed; }

/* ---------- Table ---------- */
.table-wrapper {
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  margin-bottom: 20px;
}

.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }

.data-table thead tr { background-color: #1b5e20; }

.data-table thead th {
  color: #ffffff;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.3px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.data-table thead th:hover { background-color: #2e7d32; }
.sort-icon { opacity: 0.7; margin-left: 4px; font-size: 11px; }
.data-table tbody tr { border-bottom: 1px solid #f0f0f0; transition: background-color 0.15s; }
.data-table tbody tr:last-child { border-bottom: none; }
.data-table tbody tr:hover, .data-table tbody tr.row-highlight { background-color: #f9fbe9; }
.data-table tbody td { padding: 12px 16px; color: #333; }

/* ---------- Status Badge ---------- */
.row-status-cell { min-width: 120px; }
.status-badge { font-size: 12px; font-weight: 600; }
.status-active { color: #2e7d32; }
.status-deactivated { color: #e53935; }

/* ---------- Row Action Buttons ---------- */
.row-actions { display: flex; gap: 6px; }

.action-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s;
}

.action-btn.view  { background-color: #e8f5e9; }
.action-btn.edit  { background-color: #43a047; color: #fff; }
.action-btn.assign { background-color: #e3f2fd; }
.action-btn.delete { background-color: #ffebee; }
.action-btn:hover { opacity: 0.8; }

/* ---------- Stats Row ---------- */
.stats-row { display: flex; gap: 16px; }

.stat-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 180px;
  gap: 16px;
}

.stat-info { display: flex; flex-direction: column; }
.stat-label { font-size: 11px; color: #9e9e9e; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-value { font-size: 22px; font-weight: 700; color: #1a1a1a; }
.stat-icon { font-size: 24px; opacity: 0.6; }
.trend-up { color: #43a047; opacity: 1; }
</style>
