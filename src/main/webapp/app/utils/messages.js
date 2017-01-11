
const data = {
  'User with that name has already existed': `Пользователь с таким именем уже существует`,
  'User with that name isn\'t exist': `Такого пользователя не существует`,
  'wrong_password': `Неверный пароль`
}

export default function t(key) {
  if (data[key]) {
    return data[key]
  }
  return key;
}