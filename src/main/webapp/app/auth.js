import $ from 'jquery';

function pretendRegisterRequest(username, password, cb) {
  console.log(`pretendRegisterRequest: ${username}:${password}`);
  $.ajax({
    type: 'POST',
    url: `${window.config.basename}/api/register`,
    contentType: 'application/json',
    data: JSON.stringify({ username, password }),
    success: data => {
      console.log(data);
      if (data.token) {
        cb({
          authenticated: true,
          token: data.token,
        })
      } else {
        cb({ authenticated: false, message: data.message })
      }
    },
    error: (xhr, status, err) => {
      console.error(status, err.toString());
      cb({ authenticated: false })
    }
  });
}

function pretendRequest(username, password, cb) {
  console.log(`pretendREquest: ${username}:${password}`);
  $.ajax({
    type: 'POST',
    url: `${window.config.basename}/api/login`,
    // dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({ username, password }),
    success: data => {
      console.log(data);
      if (data.token) {
        cb({
          authenticated: true,
          token: data.token,
        })
      } else {
        cb({ authenticated: false, message: data.message })
      }
    },
    error: (xhr, status, err) => {
      console.error(status, err.toString());
      cb({ authenticated: false })
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
        if (cb) cb(true, res.message)
        this.onChange(true)
      } else {
        if (cb) cb(false, res.message)
        this.onChange(false)
      }
    })
  },

  register(username, pass, cb) {
    cb = arguments[arguments.length - 1]

    if (!username || !pass) {
      if (cb) cb(false, `Введите логин и пароль`)
      this.onChange(false)
      return 
    }

    pretendRegisterRequest(username, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        localStorage.name = username;
        if (cb) cb(true, res.message)
        this.onChange(true)
      } else {
        if (cb) cb(false, res.message)
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