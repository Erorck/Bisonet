const Utilities = {
   REGEX_VALD_EMAIL:{
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    name: 'valid_email'
   } ,
   REGEX_VALD_PASSWORD:{
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}/,
    name: 'valid_password'
  },
   REGEX_VALD_NAME: {
    pattern: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    name: 'valid_name'
  }
};

module.exports = {
  Utilities
};
