(function (window) {
    window.__env = window.__env || {};

    // API url
    //window.__env.apiUrl = 'http://192.168.99.100:8010'
//    window.__env.apiUrl = 'http://192.168.1.113:3000';
//    window.__env.apiUrl = 'http://192.168.8.102:3000';
    window.__env.apiUrl = 'http://9.192.211.00:8010';

    // Base url
    window.__env.baseUrl = '/';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
    // BitBank settings
    window.__env.BankID = "YUIDsyi9er8w0";
    window.__env.logoUrl = "resources/assets/header/BitBank_logo.png";
    window.__env.headerStyle = {'background': 'linear-gradient(90deg, #005287, #056EA1,#0D97C8)'};
    window.__env.bankOfficer = "Jesslyn Ong";
    window.__env.profileImg = {'background': 'rgba(0, 0, 0, 0) url("resources/assets/header/profile_pix.png") no-repeat scroll 0 0 /62px 62px'};

    // LoopBank settings
    //window.__env.BankID = "u893ikfbnab90";
    //window.__env.logoUrl = "../resources/assets/header/LoopBank_logo.png";
    //window.__env.profileImg = {'background': 'rgba(0, 0, 0, 0) url("../resources/assets/header/loopBank_profile.png") no-repeat scroll 0 0 /62px 62px'};
    //window.__env.headerStyle = {  'background': 'linear-gradient(90deg, #2A38B6 , #6E58C9 ,#9F70D7 )'}
    //window.__env.bankOfficer = "Jack Brown";
}(this));
