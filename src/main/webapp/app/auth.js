import $ from 'jquery';

function pretendRequest(username, password, cb) {
  console.log(`pretendREquest: ${username}:${password}`);
  $.ajax({
    type: 'POST',
    url: `${window.config.basename}/api/login`,
    dataType: 'json',
    data: { username, password },
    success: data => {
      console.log('success login epta');
      console.log(data);
      if (data.success) {
        cb({
          authenticated: true,
          token: data.token,
        })
      } else {
        cb({ authenticated: false })
      }
    },
    error: (xhr, status, err) => {
      console.error(this.props.url, status, err.toString());
    }
  });


  // setTimeout(() => {
  //   if (username === 'joe' && pass === 'pass1') {
  //     cb({
  //       authenticated: true,
  //       token: Math.random().toString(36).substring(7)
  //     })
  //   } else {
  //     cb({ authenticated: false })
  //   }
  // }, 0)
}

export default {
  login(username, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    if (!username || !pass) {
      if (cb) cb(false)
      this.onChange(false)
      return 
    }

    pretendRequest(username, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        localStorage.name = username;
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  getName() {
    return localStorage.name
  },

  logout(cb) {
    delete localStorage.token
    delete localStorage.name
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
};