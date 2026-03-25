export const endPoints = {
  auth: {
    signUp: `/auth/register`,
    signIn: `/auth/login`,
    verifyOtp: `/auth/verify_otp`,
    resetPassword: `/reset-password`,
    resetLink: `/auth/resetlink`,
    refreshToken: `/refresh-token`
},

 user: {
    profile: `/user/profile`,
    logOut: `/user/logout`,
 },

 doctor: {
    doctorList: `/user/doctor/list`,
    createAppointment: "/doctor/appointment",
    slots: "/user/slot/list",
    appointmentHistory: "/user/history",
 },

 diagnostics: {
     areaMap: `/diagnostic/nearby`,
 }
};

export const collectionOfEndpoints: string[] = 
[
    endPoints.auth.signUp,
    endPoints.auth.signIn,
    endPoints.auth.verifyOtp,
    endPoints.auth.refreshToken,
    endPoints.auth.resetLink,
    endPoints.auth.resetPassword,
    endPoints.user.profile,
    endPoints.user.logOut,
    endPoints.doctor.doctorList,
    endPoints.doctor.createAppointment,
    endPoints.doctor.slots,
    endPoints.diagnostics.areaMap,
    endPoints.doctor.appointmentHistory,
];
