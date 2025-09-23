// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 17 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <SubMenu
          label={dictionary['navigation'].dashboards}
          icon={<i className='ri-home-smile-line' />}
          suffix={<Chip label='2' size='small' color='primary' />}
        >
          <MenuItem href={`/${locale}/dashboards/assets`}>Asset Management</MenuItem>
          <MenuItem href={`/${locale}/dashboards/warehouse`}>Warehouse Operations</MenuItem>
        </SubMenu>
        <MenuSection label={dictionary['navigation'].assetManagement || 'Asset Management'}>
          <SubMenu
            label="Asset Registration & Tracking"
            icon={<i className='ri-qr-code-line' />}
          >
            <MenuItem href={`/${locale}/apps/assets/requests`}>Asset Requests</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/list`}>Asset List</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/registration`}>Asset Registration</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/categories`}>Asset Categories</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/tracking`}>Asset Tracking</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/locations`}>Locations & Ownership</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/departments`}>Department Management</MenuItem>
          </SubMenu>
          
          <SubMenu
            label="Asset Maintenance"
            icon={<i className='ri-tools-line' />}
          >
            <MenuItem href={`/${locale}/apps/assets/maintenance/schedule`}>Maintenance Schedule</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/maintenance/history`}>Maintenance History</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/maintenance/tickets`}>Damage Tickets</MenuItem>
          </SubMenu>
          
          <SubMenu
            label="Asset Valuation"
            icon={<i className='ri-money-dollar-circle-line' />}
          >
            <MenuItem href={`/${locale}/apps/assets/depreciation`}>Depreciation</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/depreciation/reports`}>Depreciation Reports</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/valuation/adjustment`}>Value Adjustment</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/valuation/reports`}>Financial Reports</MenuItem>
          </SubMenu>
          
          <SubMenu
            label="Asset Transfer"
            icon={<i className='ri-exchange-line' />}
          >
            <MenuItem href={`/${locale}/apps/assets/transfer/approval`}>Transfer Approval</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/transfer/borrowing`}>Borrowing & Return</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/transfer/history`}>Movement History</MenuItem>
          </SubMenu>
          
          <SubMenu
            label="Asset Disposal"
            icon={<i className='ri-delete-bin-line' />}
          >
            <MenuItem href={`/${locale}/apps/assets/disposal/workflow`}>Disposal Workflow</MenuItem>
            <MenuItem href={`/${locale}/apps/assets/disposal/auction`}>Auction/Donation</MenuItem>
          </SubMenu>
          
          <MenuItem href={`/${locale}/apps/assets/inventory`} icon={<i className='ri-file-list-3-line' />}>
            Asset Inventory & Audit
          </MenuItem>
          
          <MenuItem href={`/${locale}/apps/assets/procurement`} icon={<i className='ri-shopping-cart-line' />}>
            Asset Procurement
          </MenuItem>
          
          <MenuItem href={`/${locale}/apps/assets/compliance`} icon={<i className='ri-shield-check-line' />}>
            Compliance & Documentation
          </MenuItem>
        </MenuSection>

        <MenuSection label={dictionary['navigation'].warehouseManagement || 'Warehouse Management'}>
          <SubMenu
            label="Inbound Operations"
            icon={<i className='ri-truck-line' />}
          >
            <MenuItem href={`/${locale}/apps/warehouse/inbound/receiving`}>Goods Receiving</MenuItem>
            <MenuItem href={`/${locale}/apps/warehouse/inbound/quality-check`}>Quality Check</MenuItem>
            <MenuItem href={`/${locale}/apps/warehouse/inbound/putaway`}>Putaway Management</MenuItem>
          </SubMenu>
          
          <SubMenu
            label="Inventory Control"
            icon={<i className='ri-stack-line' />}
          >
            <MenuItem href={`/${locale}/apps/warehouse/inventory/real-time`}>Real-time Stock</MenuItem>
            <MenuItem href={`/${locale}/apps/warehouse/inventory/fifo-lifo`}>FIFO/LIFO/FEFO</MenuItem>
            <MenuItem href={`/${locale}/apps/warehouse/inventory/multi-warehouse`}>Multi-warehouse Control</MenuItem>
            <MenuItem href={`/${locale}/apps/warehouse/inventory/food-ingredients`}>Food Ingredients</MenuItem>
          </SubMenu>
          
          <SubMenu
            label="Outbound Operations"
            icon={<i className='ri-send-plane-line' />}
          >
            <MenuItem href={`/${locale}/apps/warehouse/outbound/picking`}>Picking Management</MenuItem>
            <MenuItem href={`/${locale}/apps/warehouse/outbound/packing`}>Packing & Shipping</MenuItem>
            <MenuItem href={`/${locale}/apps/warehouse/outbound/delivery`}>Delivery Orders</MenuItem>
          </SubMenu>
          
          <MenuItem href={`/${locale}/apps/warehouse/operations`} icon={<i className='ri-task-line' />}>
            Operations Tracking
          </MenuItem>
          
          <MenuItem href={`/${locale}/apps/warehouse/returns`} icon={<i className='ri-arrow-go-back-line' />}>
            Return & Reverse Logistics
          </MenuItem>
        </MenuSection>

        <MenuSection label="Document Management">
          <MenuItem href={`/${locale}/apps/documents`} icon={<i className='ri-file-text-line' />}>
            All Documents
          </MenuItem>
          <MenuItem href={`/${locale}/apps/documents/categories`} icon={<i className='ri-folder-line' />}>
            Categories
          </MenuItem>
          <SubMenu
            label="Document Types"
            icon={<i className='ri-file-list-3-line' />}
          >
            <MenuItem href={`/${locale}/apps/documents?tab=sop`}>SOPs & Manuals</MenuItem>
            <MenuItem href={`/${locale}/apps/documents?tab=compliance`}>Compliance</MenuItem>
            <MenuItem href={`/${locale}/apps/documents?tab=certificates`}>Certificates</MenuItem>
            <MenuItem href={`/${locale}/apps/documents?tab=reports`}>Reports</MenuItem>
          </SubMenu>
        </MenuSection>

        <MenuSection label="System Management">
          <SubMenu label="User Management" icon={<i className='ri-user-line' />}>
            <MenuItem href={`/${locale}/apps/user/list`}>User List</MenuItem>
            <MenuItem href={`/${locale}/apps/user/view`} exactMatch={false} activeUrl='/apps/user/view'>
              User Details
            </MenuItem>
          </SubMenu>
          <SubMenu label="Roles & Permissions" icon={<i className='ri-lock-2-line' />}>
            <MenuItem href={`/${locale}/apps/roles`}>Roles</MenuItem>
            <MenuItem href={`/${locale}/apps/permissions`}>Permissions</MenuItem>
          </SubMenu>
          <MenuItem href={`/${locale}/pages/account-settings`} icon={<i className='ri-settings-3-line' />}>
            Account Settings
          </MenuItem>
        </MenuSection>
        <MenuSection label="Reports & Analytics">
          <SubMenu label="Charts" icon={<i className='ri-bar-chart-2-line' />}>
            <MenuItem href={`/${locale}/charts/apex-charts`}>Apex Charts</MenuItem>
            <MenuItem href={`/${locale}/charts/recharts`}>Recharts</MenuItem>
          </SubMenu>
          <MenuItem href={`/${locale}/react-table`} icon={<i className='ri-table-alt-line' />}>
            Data Tables
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
