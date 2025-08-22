
// const permissions = [
//     "courier",
//     "reports",
//     "sim_inventory",
//     "financial_statement",
//     "sales_activation",
//     "offer_center",
//     "settings",
//     "user_and_operators",
//   ];
  
  // Permission Mapping
  const permissionMapping = {
    courier: "Courier",
    reports: "Report & History",
    sim_inventory: "Sim Inventory",
    financial_statement: "Finance report",
    sales_activation: ["Activation",],
    offer_center: "Offer Center",
    settings: "Settings",
    user_and_operators: ["Users", "Operators"],
  };
  
  // Menu Mapping
  const menuMapping = {
    courier: ["Courier list", "Price & Commission"],
    reports: [],
    sim_inventory: ["Operators", "SIM List", "Sim request"],
    financial_statement: ["Balance sheet", "Transaction"],
    sales_activation: ["Sim list", "Activation"],
    offer_center: [],
    settings: [],
    user_and_operators: [ "Agent List", "Agent Request"],
  };
  
  // Method to generate agent permissions and sub-menu permissions
  export const generateAgentPermissions = (permissions) => {
    console.log("permissionsx",permissions)
    const agent_permission = ['Contact Us','Dashboard','Settings'];
    const agent_sub_menu_permission = [];
  
    permissions.forEach((permission) => {
      const mainPermission = permissionMapping[permission];
      const subMenu = menuMapping[permission];
  
      if (Array.isArray(mainPermission)) {
        // Handle multiple main permissions
        mainPermission.forEach((perm) => {
          if (!agent_permission.includes(perm)) {
            agent_permission.push(perm);
          }
        });
      } else if (mainPermission && !agent_permission.includes(mainPermission)) {
        agent_permission.push(mainPermission);
      }
  
      // Add sub-menu items to agent_sub_menu_permission
      if (subMenu) {
        subMenu.forEach((menuItem) => {
          if (!agent_sub_menu_permission.includes(menuItem)) {
            agent_sub_menu_permission.push(menuItem);
          }
        });
      }
    });
  
    return { agent_permission, agent_sub_menu_permission };
  };
  
  // Generate permissions
 
  
 
  


