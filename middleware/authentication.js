import { Auth } from '@/plugins/firebase'
const checkSigninStatus = (context) => {
  return new Promise((resolve) => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        context.store.dispatch('auth/saveUserInfo', user)
      }
      if (context.route.path.match('members')) {
        return context.redirect('/')
      }
      return resolve(user)
    })
  })
}
export default (context) => {
  return checkSigninStatus(context)
}
