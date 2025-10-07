// Asset Request Storage Utility
// Manages asset requests in localStorage for tracking purposes

const STORAGE_KEY = 'pertamina_asset_requests'

export const assetRequestStorage = {
  // Get all asset requests
  getAll: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error reading asset requests from storage:', error)
      return []
    }
  },

  // Add new asset request
  add: (request) => {
    try {
      const requests = assetRequestStorage.getAll()
      const newRequest = {
        ...request,
        id: request.requestId || `REQ-${Date.now()}`,
        requestId: request.requestId || `REQ-${Date.now()}`,
        status: 'Pending Review',
        requestType: 'Asset Request',
        submittedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        trackingStatus: 'Submitted',
        approvalStage: 'Initial Review',
        estimatedCompletion: assetRequestStorage.calculateEstimatedCompletion(request.priority),
        statusHistory: [
          {
            status: 'Submitted',
            timestamp: new Date().toISOString(),
            note: 'Asset request submitted by employee',
            updatedBy: request.employeeId || 'System'
          }
        ]
      }
      
      requests.unshift(newRequest) // Add to beginning of array
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
      return newRequest
    } catch (error) {
      console.error('Error adding asset request to storage:', error)
      return null
    }
  },

  // Get request by ID
  getById: (id) => {
    try {
      const requests = assetRequestStorage.getAll()
      return requests.find(req => req.id === id || req.requestId === id)
    } catch (error) {
      console.error('Error getting asset request by ID:', error)
      return null
    }
  },

  // Update request status
  updateStatus: (id, newStatus, note = '', updatedBy = 'System') => {
    try {
      const requests = assetRequestStorage.getAll()
      const requestIndex = requests.findIndex(req => req.id === id || req.requestId === id)
      
      if (requestIndex !== -1) {
        requests[requestIndex].status = newStatus
        requests[requestIndex].lastUpdated = new Date().toISOString()
        
        // Add to status history
        requests[requestIndex].statusHistory.push({
          status: newStatus,
          timestamp: new Date().toISOString(),
          note: note,
          updatedBy: updatedBy
        })

        // Update tracking status based on main status
        requests[requestIndex].trackingStatus = assetRequestStorage.getTrackingStatus(newStatus)
        requests[requestIndex].approvalStage = assetRequestStorage.getApprovalStage(newStatus)
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
        return requests[requestIndex]
      }
      return null
    } catch (error) {
      console.error('Error updating asset request status:', error)
      return null
    }
  },

  // Delete request
  delete: (id) => {
    try {
      const requests = assetRequestStorage.getAll()
      const filteredRequests = requests.filter(req => req.id !== id && req.requestId !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRequests))
      return true
    } catch (error) {
      console.error('Error deleting asset request:', error)
      return false
    }
  },

  // Clear all requests (for testing)
  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Error clearing asset requests:', error)
      return false
    }
  },

  // Helper function to calculate estimated completion based on priority
  calculateEstimatedCompletion: (priority) => {
    const now = new Date()
    let daysToAdd = 10 // default

    switch (priority) {
      case 'urgent':
        daysToAdd = 3
        break
      case 'high':
        daysToAdd = 5
        break
      case 'medium':
        daysToAdd = 10
        break
      case 'low':
        daysToAdd = 15
        break
    }

    const estimatedDate = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000))
    return estimatedDate.toISOString()
  },

  // Helper function to get tracking status from main status
  getTrackingStatus: (status) => {
    const statusMap = {
      'Pending Review': 'Submitted',
      'Under Review': 'In Review',
      'Approved': 'Approved',
      'Rejected': 'Rejected',
      'In Procurement': 'Processing',
      'Ordered': 'Ordered',
      'Delivered': 'Delivered',
      'Completed': 'Completed',
      'Cancelled': 'Cancelled'
    }
    return statusMap[status] || 'Submitted'
  },

  // Helper function to get approval stage from main status
  getApprovalStage: (status) => {
    const stageMap = {
      'Pending Review': 'Initial Review',
      'Under Review': 'Department Review',
      'Approved': 'Budget Approval',
      'Rejected': 'Rejected',
      'In Procurement': 'Procurement Process',
      'Ordered': 'Order Processing',
      'Delivered': 'Asset Registration',
      'Completed': 'Completed',
      'Cancelled': 'Cancelled'
    }
    return stageMap[status] || 'Initial Review'
  },

  // Get requests by status
  getByStatus: (status) => {
    try {
      const requests = assetRequestStorage.getAll()
      return requests.filter(req => req.status === status)
    } catch (error) {
      console.error('Error getting requests by status:', error)
      return []
    }
  },

  // Get requests by employee ID
  getByEmployee: (employeeId) => {
    try {
      const requests = assetRequestStorage.getAll()
      return requests.filter(req => req.employeeId === employeeId)
    } catch (error) {
      console.error('Error getting requests by employee:', error)
      return []
    }
  },

  // Get summary statistics
  getSummary: () => {
    try {
      const requests = assetRequestStorage.getAll()
      const summary = {
        total: requests.length,
        pending: requests.filter(req => req.status === 'Pending Review').length,
        approved: requests.filter(req => req.status === 'Approved').length,
        rejected: requests.filter(req => req.status === 'Rejected').length,
        completed: requests.filter(req => req.status === 'Completed').length,
        byPriority: {
          urgent: requests.filter(req => req.priority === 'urgent').length,
          high: requests.filter(req => req.priority === 'high').length,
          medium: requests.filter(req => req.priority === 'medium').length,
          low: requests.filter(req => req.priority === 'low').length
        }
      }
      return summary
    } catch (error) {
      console.error('Error getting request summary:', error)
      return {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        completed: 0,
        byPriority: { urgent: 0, high: 0, medium: 0, low: 0 }
      }
    }
  }
}
