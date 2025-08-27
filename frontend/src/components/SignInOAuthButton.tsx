
import { useSignIn } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'

export const SignInOAuthButton = () => {
    const { t } = useTranslation()
    const { signIn, isLoaded } = useSignIn()
    if (!isLoaded) {
        return null
    }

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback"
        })
    }

    return (
        <Button onClick={signInWithGoogle} variant="secondary" className='w-full cursor-pointer text-white border-zinc-200 h-11'>
            {t("auth.continue_with_google")}
        </Button>
    )
}
