
// check user role by giving userinfo
export const checkPermission = (userinfo) => {
  if (userinfo !== undefined && userinfo.userId !== "" && userinfo.password !== "") {
    return {
      isCustomer: userinfo.role === 'customer',
      isDeliveryMan: userinfo.role === 'deliveryMan',
      isManager: userinfo.role === 'manager',
      isAdmin: userinfo.role === 'admin',
      isLog: true
    }
  } else {
    return false;
  }
}


