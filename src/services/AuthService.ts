import { initializeApp, app, credential, auth } from 'firebase-admin'

export default class AuthService {
  private readonly adminSDK: app.App
  private readonly adminAuth: auth.Auth

  constructor() {
    this.adminSDK = initializeApp({
      credential: credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    })
    this.adminAuth = this.adminSDK.auth()
  }

  async authenticate(token: string) {
    try {
      const res = await this.adminAuth.verifyIdToken(token)
      if (res) {
        return { error: null, data: res.uid }
      } else {
        return { error: 'invalid token', data: null }
      }
    } catch (error) {
      console.log(error.message)
      return { error: error.message, data: null }
    }
  }
}
