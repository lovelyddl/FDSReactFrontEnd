
// check user role by giving userInfo
export const checkPermission = (userInfo) => {
  if (userInfo !== undefined && userInfo.userName !== "" && userInfo.password !== "") {
    return {
      isCustomer: userInfo.role === 'customer',
      isDeliveryMan: userInfo.role === 'deliveryMan',
      isManager: userInfo.role === 'manager',
      isAdmin: userInfo.role === 'admin',
      isLog: true
    }
  } else {
    return false;
  }
}


