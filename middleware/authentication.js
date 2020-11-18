import { Auth } from '@/plugins/firebase'
const checkSigninStatus = (context) => {
  return new Promise((resolve) => {
    Auth.onAuthStateChanged((user) => {
      if (!user) {
        if (context.route.path.match('members')) {
          return context.redirect('/')
        }
      } else {
        context.store.dispatch('auth/saveUserInfo', user)
      }
      return resolve(user)
    })
  })
}
export default (context) => {
  return checkSigninStatus(context)
}
